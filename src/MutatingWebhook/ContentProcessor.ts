import { isNullOrUndefined } from 'util';
import { AddedTypes } from './AddedTypes';
export class ContentProcessor {

    public readonly content: JSON;

    // object fields we need to read 
    private readonly _admission_review: string = 'AdmissionReview';
    private readonly _containers: string = 'containers';
    private readonly _create: string = 'CREATE';
    private readonly _env: string = 'env';
    private readonly _init_containers: string = 'initContainers';
    private readonly _kind: string = 'kind';
    private readonly _object: string = 'object'; 
    private readonly _operation: string = 'operation';
    private readonly _request: string = 'request';
    private readonly _spec: string = 'spec';
    private readonly _template: string = 'template';
    private readonly _update: string = 'UPDATE';
    private readonly _volume_mounts: string = 'volumeMounts';
    private readonly _volumes: string = 'volumes';

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
        

        if (isNullOrUndefined(this.content[this._request])
            || isNullOrUndefined(this.content[this._request][this._operation])
            || (this.content[this._request][this._operation] !== this._create
                && this.content[this._request][this._operation] !== this._update)) {
            console.log('invalid incoming operation');
            returnValue = false;
        }
       
        if (isNullOrUndefined(this.content[this._kind])
            || this.content[this._kind] !== this._admission_review) {
            console.log('invalid incoming kind');
            returnValue = false;
        }

        if (isNullOrUndefined(this.content[this._request][this._object])
            || isNullOrUndefined(this.content[this._request][this._object][this._spec])
            || isNullOrUndefined(this.content[this._request][this._object][this._spec][this._template])
            || isNullOrUndefined(this.content[this._request][this._object][this._spec][this._template][this._spec])
            || isNullOrUndefined(this.content[this._request][this._object][this._spec][this._template][this._spec][this._containers])
            || !Array.isArray(this.content[this._request][this._object][this._spec][this._template][this._spec][this._containers])) {
            console.log('missing spec in template');
            return false;
        }

        return returnValue;
    }

    private update_content() {
        let updated_content = this.content;

        updated_content[this._request][this._object][this._spec][this._template][this._spec][this._init_containers] = AddedTypes.init_containers();
        updated_content[this._request][this._object][this._spec][this._template][this._spec][this._volumes] = AddedTypes.volumes();
        let length = updated_content[this._request][this._object][this._spec][this._template][this._spec][this._containers].length;
        for (let i = 0; i < length; i++) {
            updated_content[this._request][this._object][this._spec][this._template][this._spec][this._containers][i][this._env] = AddedTypes.env();
            updated_content[this._request][this._object][this._spec][this._template][this._spec][this._containers][i][this._volume_mounts] = AddedTypes.volume_mounts();
        };

        return updated_content;
    }

    public static TryUpdateConfig(message: string): string {
        try {
            let instance: ContentProcessor = new ContentProcessor(message);

            if (!instance.validate_content()) {
                throw new RangeError('error validating incoming content');
            }

            let updated = instance.update_content();

            return JSON.stringify(updated);
        }
        catch (ex) {
            console.log(`exception encountered ${ex}`);
            return message;
        }
    }
}