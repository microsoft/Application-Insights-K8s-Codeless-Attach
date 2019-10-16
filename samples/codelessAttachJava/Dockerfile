FROM openjdk:11-jre-slim
COPY ./target/codelessAttach-0.0.1-SNAPSHOT.jar /codelessattachJava/
WORKDIR /codelessattachJava
EXPOSE 8080
CMD ["java", "-jar", "codelessAttach-0.0.1-SNAPSHOT.jar"]