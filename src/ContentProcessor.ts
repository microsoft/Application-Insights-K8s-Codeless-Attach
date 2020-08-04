import k8s = require('@kubernetes/client-node');;
import { isNullOrUndefined } from "util";
import { logger, Metrics } from "./LoggerWrapper";
import { DeployReplica, IRootObject } from "./RequestDefinition";
import { TemplateValidator } from './TemplateValidator';
import { DiffCalculator } from './DiffCalculator'
export class ContentProcessor {

    public static async TryUpdateConfig(message: string): Promise<string> {
        logger.telemetry(Metrics.CPStart, 1);
        const response = {
            apiVersion: "admission.k8s.io/v1beta1",
            kind: "AdmissionReview",
            request: undefined,
            response: {
                allowed: false, // when error it is ignored as per the config
                patch: undefined,
                patchtype: "JSONPATCH",
                uid: "",
            },
        };
        let instance: ContentProcessor;

        /* tslint:disable */
        return new Promise<object>((resolve, reject) => {
            /* tslint:enable */
            instance = new ContentProcessor(message);
            response.request = instance.content.request;
            response.apiVersion = instance.content.apiVersion;
            response.response.uid = instance.content.request.uid;
            response.kind = instance.content.kind;
            response.response.allowed = TemplateValidator.ValidateContent(instance.content);

            resolve(instance.getPodExtraData());
        }).then(async (extraData) => {

            if (response.response.allowed) {
                response.response.patch = Buffer.from(
                    JSON.stringify(
                        await DiffCalculator.CalculateDiff(instance.content, extraData as DeployReplica)))
                    .toString("base64");
                logger.telemetry(Metrics.CPSuccess, 1);
            } else {
                logger.telemetry(Metrics.CPFail, 1);
            }

            const finalResult = JSON.stringify(response);
            logger.info(`determined final response`,finalResult);
            return finalResult;
        }).catch((ex) => {
            logger.error(`exception encountered `, ex);
            logger.telemetry(Metrics.CPError, 1);
            return JSON.stringify(response);
        });
    }

    public readonly content: IRootObject;

    private constructor(message: string) {

        if (message === "" || isNullOrUndefined(message)) {
            throw new RangeError("message");
        }

        try {
            this.content = JSON.parse(message);
            logger.info(`parsed incoming message content, Initialized ContentProcessor.`, message);
        } catch (ex) {
            logger.error(`exception encountered parsing input`,ex,message);
            throw ex;
        }
    }

    private getPodExtraData(): Promise<DeployReplica> {

        logger.info("attempting to get owner info");
        const extraData: DeployReplica = new DeployReplica();
        extraData.podName = this.content.request.object.metadata.generateName;
        const namespaceName = this.content.request.namespace;

        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

        if (this.content.kind === "Testing") {
            extraData.deploymentName = extraData.podName;
            extraData.replicaName = extraData.podName;
            extraData.namespace = namespaceName;
            return Promise.resolve(extraData);
        }
        if (!this.content.request.object.metadata.ownerReferences
            || !this.content.request.object.metadata.ownerReferences[0]
            || !this.content.request.object.metadata.ownerReferences[0].name) {
            return Promise.reject("missing owner refference");
        }
        const replicaName = this.content.request.object.metadata.ownerReferences[0].name;
        logger.info(`calling API with namespace ${namespaceName} and replicaset ${replicaName}`, namespaceName, replicaName);

        return k8sApi.readNamespacedReplicaSet(replicaName, namespaceName).then((result) => {
            extraData.deploymentName = result.body.metadata.ownerReferences[0].name;
            extraData.replicaName = result.body.metadata.name;
            extraData.namespace = result.body.metadata.namespace;

            logger.info(`got the extra data `, extraData);
            return extraData;
        }).catch((error) => {
            logger.info(`failed to get extra data`, error);
            throw (error);
        });
    }
}