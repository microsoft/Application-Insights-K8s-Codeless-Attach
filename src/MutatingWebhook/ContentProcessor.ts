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
        try {
            let instance = new ContentProcessor(message);
            return JSON.stringify(instance.content);
        }
        catch(ex){
            console.log(`exception encountered ${ex}`);
            return message;
        }
    }
}