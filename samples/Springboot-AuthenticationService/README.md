# Java SpringBoot Microservice

This is a sample springboot microservice which is instrumented with Application Insights Java SDK and Application Insights
JVM Agent. This service communicates with other microservices to perform authentication. 


## Setup

1. Provide the Sql Server connection string in application.properties file by updating `spring.datasource.url`.
2. Provide instrumentation key value in application.properties file.

## Build and Run
1. Run the command `./mvnw clean package` to clean and build the app.
2. Run the application using `java -javaagent:/path/to/java-agent-location -jar target/SpringBoot-AuthenticationService.jar`
