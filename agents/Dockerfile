FROM mcr.microsoft.com/applicationinsights/codeless-attach/mutating-webhook-agents:preview2833

ADD ./java/aiTelemetry/target/aiTelemetry-1.0-SNAPSHOT.jar /agents/telemetry/java/ai-telemetry.jar
ADD ./node /agents/telemetry/node
ADD ./logsuploader/logsuploader /agents/telemetry/logsuploader/logsuploader