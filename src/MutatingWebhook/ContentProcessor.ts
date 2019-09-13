import { isNullOrUndefined } from "util";

export class ContentProcessor {
    public content: JSON;

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

    public static TryUpdateConfig(message: string) {
        let instance = new ContentProcessor(message);
        return JSON.stringify(instance.content);
    }
}