import { isNullOrUndefined } from "util";
import { logger, Metrics } from "./LoggerWrapper";
import { IRootObject } from "./RequestDefinition";

export class TemplateValidator {
    public static ValidateContent(content: IRootObject) {
        let returnValue = true;
        logger.info(`validating content`,content);

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

            logger.error("invalid incoming kind", content.kind);
            returnValue = false;
        }
        else if (isNullOrUndefined(content.request.object)
            || isNullOrUndefined(content.request.object.spec)) {

            logger.error("missing spec in template");
            returnValue = false;
        }

        logger.info(`succesfully validated content`, content);
        logger.telemetry(returnValue ? Metrics.CPValidationPass : Metrics.CPValidationFail, 1);
        return returnValue;
    }
}