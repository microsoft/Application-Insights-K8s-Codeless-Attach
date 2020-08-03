FROM  mcr.microsoft.com/applicationinsights/codeless-attach/inprocagents:2.8.37.appsvc-preview8

ADD ./java/aiTelemetry/target/aiTelemetry-1.0-SNAPSHOT.jar /agents/telemetry/java/ai-telemetry.jar
ADD ./node /agents/telemetry/node
ADD ./logsuploader/logsuploader /agents/telemetry/logsuploader/logsuploader