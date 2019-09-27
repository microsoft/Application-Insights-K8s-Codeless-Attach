export class AddedTypes {
    public static init_containers() {
        return [{
            command: ["cp", "/java-agent-v1.jar", "/agentconfig/java-agent-v1.jar"],
            image: "mcr.microsoft.com/applicationinsights/attach-agents:v5",
            name: "agent-init",
            volumeMounts: [{
                mountPath: "/agentconfig",
                name: "agentdisk",
            }],
        }];
    }

    public static env() {
        return [
            {
                name: "_JAVA_OPTIONS",
                value: "-javaagent:/agentconfig/java-agent-v1.jar",
            },
            {
                name: "JAVA_TOOL_OPTIONS",
                value: "-javaagent:/agentconfig/java-agent-v1.jar",
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
            name: "agent-volume",
            persistentVolumeClaim: {
                claimName: "agent-disk",
            },
        }];
    }
}
