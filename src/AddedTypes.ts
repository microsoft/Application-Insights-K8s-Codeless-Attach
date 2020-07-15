import { DeployReplica } from "./RequestDefinition";
import { ConfigReader } from './ConfigReader';

export class AddedTypes {
    public static init_containers() {
        return [{
            args: ["-a", "/agents/.", "/agentfiles"],
            command: ["cp"],
            image: process.env.AGENTS_IMAGE || "ERROR",
            name: "agent-init",
            volumeMounts: [{
                mountPath: "/agentfiles",
                name: "agent-volume",
            }],
        },
        {
            args: ["-a", "/agents/.", "/agenttelemetry"],
            command: ["cp"],
            image: process.env.TELEMETRY_IMAGE || "ERROR",
            name: "agent-telemetry-init",
            volumeMounts: [{
                mountPath: "/agenttelemetry",
                name: "agent-telemetry-volume",
            }],
        }];
    }

    public static async env(extraData: DeployReplica) {
        const returnValue = [
            {
                name: "JAVA_TOOL_OPTIONS",
                value: "-javaagent:/agentfiles/java/applicationinsights-agent-codeless.jar -javaagent:/agenttelemetry/java/ai-telemetry.jar",
            },
            {
                name: "NODE_OPTIONS",
                value: "--require /agentfiles/node/ai-bootstrap.js --require /agenttelemetry/node/ai-telemetry.js",
            },
            {
                name: "APPINSIGHTS_INSTRUMENTATIONKEY",
                value: (await ConfigReader.ReadConfig()).retrieveIkey(extraData.namespace)
            },
            {
                name: "TELEMETRY_IKEY",
                value: process.env.TELEMETRY_IKEY,
            }
            /*{
                name: "APPLICATIONINSIGHTS_CONNECTION_STRING",
                valueFrom: {
                    configMapKeyRef: {
                        key: "connectionString",
                        name: "attach-config",
                    },
                },
            },*/
        ];

        if (extraData && extraData.deploymentName) {
            returnValue.push({
                name: "APPLICATIONINSIGHTS_ROLE_NAME",
                value: extraData.deploymentName,
            });
            returnValue.push({
                name: "WEBSITE_HOSTNAME",
                value: extraData.deploymentName,
            });

        }

        if (extraData && extraData.podName) {
            returnValue.push({
                name: "APPLICATIONINSIGHTS_ROLE_INSTANCE",
                value: extraData.podName,
            });
        }

        return returnValue;
    }

    public static volume_mounts() {
        return [{
            mountPath: "/agentfiles",
            name: "agent-volume",
        },
        {
            mountPath: "/agenttelemetry",
            name: "agent-telemetry-volume",
        }];
    }

    public static volumes() {
        return [{
            emptyDir: {},
            name: "agent-volume",
        },
        {
            emptyDir: {},
            name: "agent-telemetry-volume",
        }];
    }
}
