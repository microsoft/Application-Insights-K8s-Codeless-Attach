export class AddedTypes {
    public static init_containers() {
        return [{
            args: ["-a", "/agents/.", "/agentconfig"],
            command: ["cp"],
            image: process.env.AGENTS_IMAGE || "ERROR",
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
                name: "APPINSIGHTS_INSTRUMENTATIONKEY",
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
