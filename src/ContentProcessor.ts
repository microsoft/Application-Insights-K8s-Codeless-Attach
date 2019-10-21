import { diff, patch } from "jiff";
import { isNullOrUndefined } from "util";
import { AddedTypes } from "./AddedTypes";
import { logger } from "./LoggerWrapper";
import { IRootObject, DeployReplica } from "./RequestDefinition";
import * as k8s from '@kubernetes/client-node';
import { resolve } from "url";

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
        return new Promise<Object>((resolve, reject) => {
            response.request = instance.content.request;
            response.apiVersion = instance.content.apiVersion;
            response.response.uid = instance.content.request.uid;
            response.kind = instance.content.kind;
            response.response.allowed = instance.validate_content();

            resolve(instance.getDeploymentName());
        }).then(result => {

            let deploymentName = result;
            if (response.response.allowed) {
                response.response.patch = Buffer.from(JSON.stringify(instance.calculate_diff())).toString("base64");
            }

            const finalResult = JSON.stringify(response);
            logger.info(`determined final response ${finalResult}`);
            return finalResult;
        }).catch(ex => {
            logger.error(`exception encountered ${ex}`);
            return JSON.stringify(response);
        })
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

    private calculate_diff() : string {
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
                Array.prototype.push.apply(updateTarget["containers"][i].env, AddedTypes.env());
            } else {
                updateTarget["containers"][i].env = AddedTypes.env();
            }

            if (updateTarget["containers"][i].volumeMounts) {
                Array.prototype.push.apply(updateTarget["containers"][i].volumeMounts, AddedTypes.volume_mounts());
            } else {
                updateTarget["containers"][i].volumeMounts = AddedTypes.volume_mounts();
            }
        }

        const jsonDiff = diff(this.content.request.object, updatedContent.request.object);
/* tslint:enable */
        logger.info(`determined diff ${JSON.stringify(jsonDiff)}`);
        return jsonDiff;
    }


    private getDeploymentName(): Promise<DeployReplica> {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();

        const k8sApi = kc.makeApiClient(k8s.AppsV1beta2Api);
        let namespaceName = this.content.request.namespace;
        let replicaName = this.content.request.object.metadata["ownerReferences"][0]["name"];
        return k8sApi.readNamespacedReplicaSet("codeless-attach-core-6c5f5bd64d", namespaceName).then(result => {
            let extraData: DeployReplica = new DeployReplica(); 
            extraData.deploymentName = result.body.metadata.ownerReferences[0].name;
            extraData.replicaName = result.body.metadata.name
            return extraData;
        }).catch(error => {
            return null;
        });
    }
}
