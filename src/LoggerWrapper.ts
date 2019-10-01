import { configure, getLogger } from "log4js";

configure({
    appenders: {
        console: {
            layout: {
                type: "coloured",
            },
            type: "stdout",
        },
        file: {
            filename: "all-the-logs.log",
            layout: {
                type: "coloured",
            },
            type: "file",
        },
    },
    categories: {
        default: {
            appenders: [/*"file"*/, "console"],
            level: "debug",
        },
    },
});

export const logger = getLogger("default");
