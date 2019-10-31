import { DeployReplica } from "./RequestDefinition";
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
        }];
    }

    public static env(extraData: DeployReplica) {
        const returnValue = [
            {
                name: "JAVA_TOOL_OPTIONS",
                value: "-javaagent:/agentfiles/java/applicationinsights-agent-codeless.jar",
            },
            {
                name: "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES",
                value: "StartupBootstrapper",
            },
            {
                name: "DOTNET_ADDITIONAL_DEPS",
                value: "/agentfiles/core/additionalDeps",
            },
            {
                name: "DOTNET_SHARED_STORE",
                value: "/agentfiles/core/store",
            },
            {
                name: "NODE_OPTIONS",
                value: "--require /agentfiles/node/ai-bootstrap.js",
            },
            {
                name: "APPINSIGHTS_INSTRUMENTATIONKEY",
                valueFrom: {
                    configMapKeyRef: {
                        key: "ikey",
                        name: "attach-config",
                    },
                },
            },
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
        }];
    }

    public static volumes() {
        return [{
            emptyDir: {},
            name: "agent-volume",
        }];
    }
}
