import { isNullOrUndefined } from 'util';
import { AddedTypes } from './AddedTypes';
import { diff } from 'jiff';
import { RootObject} from './RequestDefinition';
import { logger } from './LoggerWrapper';
export class ContentProcessor {

    public readonly content: RootObject;

    private constructor(message: string) {

        if (message === "" || isNullOrUndefined(message)) {
            throw new RangeError('message');
        }

        try {
            this.content = JSON.parse(message);
            logger.info(`parsed incoming message content: ${message}, Initialized ContentProcessor.`);
        }
        catch (ex) {
            logger.error(`exception ${ex} encountered parsing input ${message}`);
            throw ex;
        }
    }

    private validate_content(): boolean {

        let returnValue = true;
        logger.info(`validating content ${this.content}`);
        if (isNullOrUndefined(this.content)) {
            logger.error('null content');
        }

        if (isNullOrUndefined(this.content.request)
            || isNullOrUndefined(this.content.request.operation)
            || (this.content.request.operation !== 'CREATE'
                && this.content.request.operation !== "UPDATE")) {
            logger.error('invalid incoming operation');
            returnValue = false;
        }

        if (isNullOrUndefined(this.content.kind)
            || this.content.kind !== 'AdmissionReview') {
            logger.error('invalid incoming kind');
            returnValue = false;
        }

        if (isNullOrUndefined(this.content.request.object)
            || isNullOrUndefined(this.content.request.object.spec)
            || isNullOrUndefined(this.content.request.object.spec.template)
            || isNullOrUndefined(this.content.request.object.spec.template.spec)
            || isNullOrUndefined(this.content.request.object.spec.template.spec.containers)
            || !Array.isArray(this.content.request.object.spec.template.spec.containers)) {
            logger.error('missing spec in template');
            return false;
        }

        logger.info(`succesfully validated content ${JSON.stringify(this.content)}`)
        return returnValue;
    }

    private calculate_diff() {

        logger.info(`calculating diff`);
        let updated_content: RootObject = JSON.parse(JSON.stringify(this.content));

        let update_target = updated_content.request.object.spec.template.spec;

        update_target.initContainers = AddedTypes.init_containers();
        update_target.volumes = AddedTypes.volumes();

        let length = update_target.containers.length;

        for (let i = 0; i < length; i++) {
            update_target.containers[i].env = AddedTypes.env();
            update_target.containers[i].volumeMounts = AddedTypes.volume_mounts();
        };

        let json_diff = diff(this.content.request.object, updated_content.request.object);

        logger.info(`determined diff ${JSON.stringify(json_diff)}`);
        return json_diff;
    }

    public static TryUpdateConfig(message: string): string {

        let response = {
            'response': {
                'allowed': false, // when error it is ignored as per the config
                'uid': '',
                'patch': '',
                'patchtype': 'JSONPATCH'
            }
        };
        
        try {
            let instance: ContentProcessor = new ContentProcessor(message);

            response.response.uid = instance.content.request.uid;

            if (instance.validate_content()) {
                response.response.allowed = true;
                response.response.patch = instance.calculate_diff();
            }
            let final_result = JSON.stringify(response)
            logger.info(`determined final response ${final_result}`);
            return final_result;
        }
        catch (ex) {
            logger.error(`exception encountered ${ex}`);
            return JSON.stringify(response);
        }
    }
}