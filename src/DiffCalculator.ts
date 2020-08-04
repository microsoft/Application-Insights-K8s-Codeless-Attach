import { isNullOrUndefined } from "util";
import { AddedTypes } from "./AddedTypes";
import { logger, Metrics } from "./LoggerWrapper";
import { DeployReplica, IRootObject } from "./RequestDefinition";

export class DiffCalculator {
    public static async CalculateDiff(content: IRootObject, extraData: DeployReplica): Promise<object> {

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
        logger.telemetry(Metrics.CPContainers, length);

        for (let i = 0; i < length; i++) {
            if (updateTarget["containers"][i].env) {
                Array.prototype.push.apply(updateTarget["containers"][i].env,await AddedTypes.env(extraData));
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
        logger.info(`determined diff`, jsonDiff);
        return jsonDiff;
    }
}