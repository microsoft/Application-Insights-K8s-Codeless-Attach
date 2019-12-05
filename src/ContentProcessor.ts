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
        const instance: ContentProcessor = new ContentProcessor(message);
/* tslint:disable */
        return new Promise<object>((resolve, reject) => {
/* tslint:enable */
            response.request = instance.content.request;
            response.apiVersion = instance.content.apiVersion;
            response.response.uid = instance.content.request.uid;
            response.kind = instance.content.kind;
            response.response.allowed = instance.validate_content();

            resolve(instance.getPodExtraData());
        }).then((extraData) => {

            if (response.response.allowed) {
                response.response.patch = Buffer.from(
                    JSON.stringify(
                        instance.calculate_diff(extraData as DeployReplica)))
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

    private validate_content() {
        let returnValue = true;
        logger.info(`validating content ${JSON.stringify(this.content)}`);

        if (isNullOrUndefined(this.content)) {
            logger.error("null content");
        }

        if (isNullOrUndefined(this.content.request)
            || isNullOrUndefined(this.content.request.operation)
            || (this.content.request.operation !== "CREATE"
                && this.content.request.operation !== "UPDATE")) {

            logger.error("invalid incoming operation");
            returnValue = false;
        }

        if (isNullOrUndefined(this.content.kind)
            || this.content.kind !== "AdmissionReview") {

            logger.error("invalid incoming kind");
            returnValue = false;
        }

        if (isNullOrUndefined(this.content.request.object)
            || isNullOrUndefined(this.content.request.object.spec)) {

            logger.error("missing spec in template");
            returnValue = false;
        }

        logger.info(`succesfully validated content ${JSON.stringify(this.content)}`);
        return returnValue;
    }

    private calculate_diff(extraData: DeployReplica): object {
/* tslint:disable */
        logger.info(`calculating diff`);
        const updatedContent: IRootObject = JSON.parse(JSON.stringify(this.content));

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

    private getPodExtraData(): Promise<DeployReplica> {

        logger.info("attempting to get owner info");
        const extraData: DeployReplica = new DeployReplica();
        extraData.podName = this.content.request.object.metadata.generateName;

        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        const k8sApi = kc.makeApiClient(k8s.AppsV1beta2Api);
        const namespaceName = this.content.request.namespace;
 /* tslint:disable */
        const replicaName = this.content.request.object.metadata["ownerReferences"][0].name;
 /* tslint:enable */

        logger.info(`calling API with namespace ${namespaceName} and replicaset ${replicaName}`);

        return k8sApi.readNamespacedReplicaSet(replicaName, namespaceName).then((result) => {
            extraData.deploymentName = result.body.metadata.ownerReferences[0].name;
            extraData.replicaName = result.body.metadata.name;
            extraData.namespace = namespaceName;

            logger.info(`got the following extra data ${JSON.stringify(extraData)}`);
            return extraData;
        }).catch((error) => {
            logger.info(`failed to get extra data error ${JSON.stringify(error)}`);
            throw (error);
        });
    }
}
