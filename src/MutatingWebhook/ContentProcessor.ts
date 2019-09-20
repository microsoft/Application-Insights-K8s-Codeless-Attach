import { isNullOrUndefined } from 'util';
import { AddedTypes } from './AddedTypes';
import { diff } from 'jiff';
import { RootObject} from './RequestDefinition';

export class ContentProcessor {

    public readonly content: RootObject;

    private constructor(message: string) {
        if (message === "" || isNullOrUndefined(message)) {
            throw new RangeError('message');
        }

        try {
            this.content = JSON.parse(message);
        }
        catch (ex) {
            console.log(`exception encountered parsing input ${ex}`);
            throw ex;
        }
    }

    private validate_content(): boolean {
        let returnValue = true;

        if (isNullOrUndefined(this.content)) {
            console.log('null content');
        }

        if (isNullOrUndefined(this.content.request)
            || isNullOrUndefined(this.content.request.operation)
            || (this.content.request.operation !== 'CREATE'
                && this.content.request.operation !== "UPDATE")) {
            console.log('invalid incoming operation');
            returnValue = false;
        }

        if (isNullOrUndefined(this.content.kind)
            || this.content.kind !== 'AdmissionReview') {
            console.log('invalid incoming kind');
            returnValue = false;
        }

        if (isNullOrUndefined(this.content.request.object)
            || isNullOrUndefined(this.content.request.object.spec)
            || isNullOrUndefined(this.content.request.object.spec.template)
            || isNullOrUndefined(this.content.request.object.spec.template.spec)
            || isNullOrUndefined(this.content.request.object.spec.template.spec.containers)
            || !Array.isArray(this.content.request.object.spec.template.spec.containers)) {
            console.log('missing spec in template');
            return false;
        }

        return returnValue;
    }
    //[[gearama]] console logs are visible  in the logs 
    //[[gearama]] what happens when it fails , and what error looks like , foes it say what fails
    //[[gearama]] trace success, and trace errors to std error
    private update_content() {
        let updated_content: RootObject = JSON.parse(JSON.stringify(this.content));

        let update_target = updated_content.request.object.spec.template.spec;

        update_target.initContainers = AddedTypes.init_containers();
        update_target.volumes = AddedTypes.volumes();

        let length = update_target.containers.length;

        for (let i = 0; i < length; i++) {
            update_target.containers[i].env = AddedTypes.env();
            update_target.containers[i].volumeMounts = AddedTypes.volume_mounts();
        };

        return diff(this.content.request.object, updated_content.request.object);
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
                response.response.patch = instance.update_content();
            }

            return JSON.stringify(response);
        }
        catch (ex) {
            console.log(`exception encountered ${ex}`);
            return JSON.stringify(response);
        }
    }
}