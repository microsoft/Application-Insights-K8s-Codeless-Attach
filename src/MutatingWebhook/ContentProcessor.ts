import { isNullOrUndefined } from "util";

export class ContentProcessor {

    public readonly content: JSON;
    private readonly _request: string = 'request';
    private readonly _operation: string = 'operation';
    private readonly _kind: string = 'kind';
    private readonly _create: string = 'CREATE';
    private readonly _update: string = 'UPDATE';
    private readonly _admission_review: string = 'AdmissionReview';

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
            || this.content[this._request][this._operation] === this._create
            || this.content[this._request][this._operation] === this._update) {
            console.log('invalid incoming operation');
            returnValue = false;
        }

        if (isNullOrUndefined(this.content[this._kind])
            || this.content[this._kind][this._operation] === this._admission_review) {
            console.log('invalid incoming kind');
            returnValue = false;
        }

        return returnValue;
    }

    public static TryUpdateConfig(message: string): string {
        try {
            let instance: ContentProcessor = new ContentProcessor(message);

            if (!instance.validate_content()) {
                throw new RangeError('error validating incoming content');
            }

            return JSON.stringify(instance.content);
        }
        catch (ex) {
            console.log(`exception encountered ${ex}`);
            return message;
        }
    }
}