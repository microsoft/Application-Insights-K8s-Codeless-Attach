import * as k8s from "@kubernetes/client-node";
import { isNullOrUndefined } from "util";
import { AddedTypes } from "./AddedTypes";
import { logger } from "./LoggerWrapper";
import { DeployReplica, IRootObject } from "./RequestDefinition";

export class ContentProcessor {

    public static async TryUpdateConfig(message: string): Promise<string> {
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
        }).then((extraData) => {

            if (response.response.allowed) {
                response.response.patch = Buffer.from(
                    JSON.stringify(
                        DiffCalculator.CalculateDiff(instance.content, extraData as DeployReplica)))
                    .toString("base64");
            }

            const finalResult = JSON.stringify(response);
            logger.info(`determined final response ${finalResult}`);
            return finalResult;
        }).catch((ex) => {
            logger.error(`exception encountered ${ex}`);
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
            logger.info(`parsed incoming message content: ${message}, Initialized ContentProcessor.`);
        } catch (ex) {
            logger.error(`exception ${ex} encountered parsing input ${message}`);
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
        const k8sApi = kc.makeApiClient(k8s.AppsV1beta2Api);

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
        logger.info(`calling API with namespace ${namespaceName} and replicaset ${replicaName}`);

        return k8sApi.readNamespacedReplicaSet(replicaName, namespaceName).then((result) => {
            extraData.deploymentName = result.body.metadata.ownerReferences[0].name;
            extraData.replicaName = result.body.metadata.name;
            extraData.namespace = result.body.metadata.namespace;

            logger.info(`got the following extra data ${JSON.stringify(extraData)}`);
            return extraData;
        }).catch((error) => {
            logger.info(`failed to get extra data error ${JSON.stringify(error)}`);
            throw (error);
        });
    }
}

export class TemplateValidator {
    public static ValidateContent(content: IRootObject) {
        let returnValue = true;
        logger.info(`validating content ${JSON.stringify(content)}`);

        if (isNullOrUndefined(content)) {
            logger.error("null content");
            returnValue = false;
        }
        else if (isNullOrUndefined(content.request)
            || isNullOrUndefined(content.request.operation)
            || (content.request.operation !== "CREATE"
                && content.request.operation !== "UPDATE")) {

            logger.error("invalid incoming operation");
            returnValue = false;
        }
        else if (isNullOrUndefined(content.kind)
            || (content.kind !== "AdmissionReview" && content.kind !== "Testing")) {

            logger.error("invalid incoming kind");
            returnValue = false;
        }
        else if (isNullOrUndefined(content.request.object)
            || isNullOrUndefined(content.request.object.spec)) {

            logger.error("missing spec in template");
            returnValue = false;
        }

        logger.info(`succesfully validated content ${JSON.stringify(content)}`);
        return returnValue;
    }
}

export class DiffCalculator {
    public static CalculateDiff(content: IRootObject, extraData: DeployReplica): object {

        if (isNullOrUndefined(content)) {
            logger.error("null content");
            return null;
        }

        /* tslint:disable */
        logger.info(`calculating diff`);
        const updatedContent: IRootObject = JSON.parse(JSON.stringify(content));

        let updateTarget: object;

        try {
            updateTarget = updatedContent.request.object.spec.template.spec;
            logger.info(`updating request.object.spec.template.spec`);
        }
        catch (ex) {
            updateTarget = updatedContent.request.object.spec;
            logger.info(`updating request.object.spec`);
        }

        if (updateTarget["initContainers"]) {
            Array.prototype.push.apply(updateTarget["initContainers"], AddedTypes.init_containers());
        } else {
            updateTarget["initContainers"] = AddedTypes.init_containers();
        }

        if (updateTarget["volumes"]) {
            Array.prototype.push.apply(updateTarget["volumes"], AddedTypes.volumes());
        } else {
            updateTarget["volumes"] = AddedTypes.volumes();
        }

        const length = updateTarget["containers"].length;

        for (let i = 0; i < length; i++) {
            if (updateTarget["containers"][i].env) {
                Array.prototype.push.apply(updateTarget["containers"][i].env, AddedTypes.env(extraData));
            } else {
                updateTarget["containers"][i].env = AddedTypes.env(extraData);
            }

            if (updateTarget["containers"][i].volumeMounts) {
                Array.prototype.push.apply(updateTarget["containers"][i].volumeMounts, AddedTypes.volume_mounts());
            } else {
                updateTarget["containers"][i].volumeMounts = AddedTypes.volume_mounts();
            }
        }

        const jsonDiff = [
            {
                op: "replace",
                path: "/spec",
                value: updatedContent.request.object.spec
            }];
        /* tslint:enable */
        logger.info(`determined diff ${JSON.stringify(jsonDiff)}`);
        return jsonDiff;
    }
}