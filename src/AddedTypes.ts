export class AddedTypes {
    public static init_containers() {
        return [{
            command: ["cp", "/applicationinsights-agent-codeless.jar", "/agentconfig"],
            image: "mcr.microsoft.com/applicationinsights/codeless-attach/mutating-webhook-agents:dev3",
            name: "agent-init",
            volumeMounts: [{
                mountPath: "/agentconfig",
                name: "agent-volume",
            }],
        }];
    }

    public static env() {
        return [
            {
                name: "_JAVA_OPTIONS",
                value: "-javaagent:/agentconfig/applicationinsights-agent-codeless.jar",
            },
            {
                name: "JAVA_TOOL_OPTIONS",
                value: "-javaagent:/agentconfig/applicationinsights-agent-codeless.jar",
            },
            {
                name: "ASPNETCORE_HOSTINGSTARTUP",
                value: "/agentconfig/aspnetcore-agent-v1.dll",
            },
            {
                name: "NODE_OPTIONS",
                value: "/agentconfig/nodejs-agent-v1.js",
            },
            {
                name: "APPINSIGHTS_CONNECTIONSTRING",
                valueFrom: {
                    configMapKeyRef: {
                        key: "ikey",
                        name: "attach-config",
                    },
                },
            },
        ];
    }

    public static volume_mounts() {
        return [{
            mountPath: "/agentconfig",
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
