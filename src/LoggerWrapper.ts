import { configure, getLogger, Logger } from "log4js";
import applicationInsights  = require('applicationinsights')
import { MetricTelemetry } from "applicationinsights/out/Declarations/Contracts";

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

class LocalLogger {
    private log: Logger = getLogger("default");
    private static instance: LocalLogger;
    private client: applicationInsights.TelemetryClient;

    public static Instance() {
        if (!LocalLogger.instance) {
            LocalLogger.instance = new LocalLogger();
        }

        return LocalLogger.instance;
    }

    public trace(message: any, ...args: any[]) {
        this.log.trace(message, args)
        this.fireEvent("TRACE", message, args)
    };

    public debug(message: any, ...args: any[]) {
        this.log.debug(message, args)
        this.fireEvent("DEBUG", message, args)
    };

    public info(message: any, ...args: any[]) {
        this.log.info(message, args)
        this.fireEvent("INFO", message, args)
    };

    public warn(message: any, ...args: any[]) {
        this.log.warn(message, args)
        this.fireEvent("WARN", message, args)
    };

    public error(message: any, ...args: any[]) {
        this.log.error(message, args)
        this.fireEvent("ERROR", message, args)
    };

    public fatal(message: any, ...args: any[]) {
        this.log.fatal(message, args)
        this.fireEvent("FATAL", message, args)
    };

    public mark(message: any, ...args: any[]) {
        this.log.mark(message, args)
        this.fireEvent("MARK", message, args)
    };

    private fireEvent(level: string, message: any, ...args: any[]) {
        if (this.client == null) {
            this.client = new applicationInsights.TelemetryClient(this.getKey());
        }

        const event: any = {
            name: "AppplicationMonitoring",
            properties: {
                time: Date.now(),
                level,
                message,
                extra:args
            }
        }

        this.client.trackEvent(event)
        this.client.flush();
    }

    private getKey(): string {
        if (process.env.TELEMETRY_IKEY) {
            return process.env.TELEMETRY_IKEY
        }
        if (process.env.TELEMETRY_CONN_STRING) {
            return process.env.TELEMETRY_CONN_STRING
        }
        return "320dcf98-173f-429b-ab39-df8b4951fb94"
    }

    public telemetry(metric: Metrics, value: number) {
        if (metric == null) {
            this.log.error("invalid metric")
        }

        if (this.client == null) {
            this.client = new applicationInsights.TelemetryClient(this.getKey());
        }

        const telemetryItem:MetricTelemetry = {
            name: metric,
            value: value,
            count: 1
        } 

        this.client.trackMetric(telemetryItem);
        this.client.flush();
    }
}

export const logger = LocalLogger.Instance();

export enum Metrics {
    //namespace metrics
    Namespaces = "namespaces", // namespaces in cluster
    NamespaceError = "namespaceError", // namespace list error
    NamespacePatched = "namespacePatched", // patch operations
    NamespaceFail = "namespaceFail", // patch fail 
    NamespaceSkipped = "namespaceSkipped", // patch skip operations
    //client request metrics
    Request = "request", // incoming request
    Success = "requestSuccess", // 200
    Fail = "requestFail", // 500
    Error = "requestError", // 404
    //content processor metrics
    CPSuccess = "cpSuccess",
    CPFail = "cpFail",
    CPError = "cpError",
    CPContainers = "cpContainers",
    CPStart = "cpStart",
    CPValidationFail = "cpValidationFail",
    CPValidationPass = "cpValidationPass"
}

