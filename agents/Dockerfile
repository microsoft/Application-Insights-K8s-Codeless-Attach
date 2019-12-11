FROM alpine:3.10
ARG AGENT_VERSION

ADD ./agents/$AGENT_VERSION/java/applicationinsights-agent-codeless*.jar /agents/java/applicationinsights-agent-codeless.jar
ADD ./agents/$AGENT_VERSION/java/appsvc.codeless /agents/java/appsvc.codeless
ADD ./agents/$AGENT_VERSION/nodejs /agents/node
ADD ./agents/$AGENT_VERSION/core /agents/core