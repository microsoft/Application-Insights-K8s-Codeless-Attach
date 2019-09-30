import { diff } from "jiff";
import { isNullOrUndefined } from "util";
import { AddedTypes } from "./AddedTypes";
import { logger } from "./LoggerWrapper";
import { IRootObject} from "./RequestDefinition";
export class ContentProcessor {

    public static TryUpdateConfig(message: string): string {

        const response = {
            response: {
                allowed: false, // when error it is ignored as per the config
                patch: "",
                patchtype: "JSONPATCH",
                uid: "",
            },
        };

        try {
            const instance: ContentProcessor = new ContentProcessor(message);

            response.response.uid = instance.content.request.uid;

            if (instance.validate_content()) {
                response.response.allowed = true;
                response.response.patch = instance.calculate_diff();
            }
            const finalResult = JSON.stringify(response);
            logger.info(`determined final response ${finalResult}`);
            return finalResult;
        } catch (ex) {
            logger.error(`exception encountered ${ex}`);
            return JSON.stringify(response);
        }
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

    private validate_content(): boolean {

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
            || isNullOrUndefined(this.content.request.object.spec)
            || isNullOrUndefined(this.content.request.object.spec.template)
            || isNullOrUndefined(this.content.request.object.spec.template.spec)
            || isNullOrUndefined(this.content.request.object.spec.template.spec.containers)
            || !Array.isArray(this.content.request.object.spec.template.spec.containers)) {

            logger.error("missing spec in template");
            return false;
        }

        logger.info(`succesfully validated content ${JSON.stringify(this.content)}`);
        return returnValue;
    }

    private calculate_diff() {

        logger.info(`calculating diff`);
        const updatedContent: IRootObject = JSON.parse(JSON.stringify(this.content));

        const updateTarget = updatedContent.request.object.spec.template.spec;

        updateTarget.initContainers = AddedTypes.init_containers();
        updateTarget.volumes = AddedTypes.volumes();

        const length = updateTarget.containers.length;

        for (let i = 0; i < length; i++) {
            updateTarget.containers[i].env = AddedTypes.env();
            updateTarget.containers[i].volumeMounts = AddedTypes.volume_mounts();
        }

        const jsonDiff = diff(this.content.request.object, updatedContent.request.object);

        logger.info(`determined diff ${JSON.stringify(jsonDiff)}`);
        return jsonDiff;
    }
}
