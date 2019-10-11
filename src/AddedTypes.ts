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

    public static env() {
        return [
            {
                name: "JAVA_TOOL_OPTIONS",
                value: "-javaagent:/agentfiles/java/applicationinsights-agent-codeless.jar",
            },
            {
                name: "ASPNETCORE_HOSTINGSTARTUPASSEMBLIES",
                value: "StartupBootstrapper",
            },
            {
                name:"DOTNET_ADDITIONAL_DEPS",
                value: "\\agentfiles\\core\\additionalDeps\\;%ProgramFiles(x86)%\\dotnet\\additionalDeps\\Microsoft.AspNetCore.ApplicationInsights.HostingStartup"
            },
            {
                name: "DOTNET_SHARED_STORE",
                value: "\\agentfiles\\core\\store\\"
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
