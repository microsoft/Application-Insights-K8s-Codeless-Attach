﻿import { DeployReplica } from "./RequestDefinition";
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
        ];
    }

    public static async env(extraData: DeployReplica) {
        const returnValue = [
            {
                name: "JAVA_TOOL_OPTIONS",
                value: "-javaagent:/agentfiles/telemetry/java/ai-telemetry.jar -javaagent:/agentfiles/java/applicationinsights-agent-codeless.jar  -Dsite.logdir=/var/log",
            },
            {
                name: "NODE_OPTIONS",
                value: "--require /agentfiles/telemetry/node/ai-telemetry.js --require /agentfiles/node/build/src/Loader.js",
            },
            {
                name: "APPINSIGHTS_INSTRUMENTATIONKEY",
                value: (await ConfigReader.ReadConfig()).retrieveIkey(extraData.namespace)
            },
            {
                name: "TELEMETRY_IKEY",
                value: process.env.TELEMETRY_IKEY,
            },
            {
                name: "TELEMETRY_CONN_STRING",
                value: process.env.TELEMETRY_CONN_STRING,
            },
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
        }]
    }

    public static volumes() {
        return [{
            emptyDir: {},
            name: "agent-volume",
        }];
    }
}
