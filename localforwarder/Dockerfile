FROM buildpack-deps:jessie-curl
#RUN apk update && apk add libintl libstdc++ openssl libc6-compat
COPY /bin/ /bin/
WORKDIR /bin
RUN chmod +x /bin/Microsoft.LocalForwarder.ConsoleHost
EXPOSE 50001
ENTRYPOINT ["/bin/Microsoft.LocalForwarder.ConsoleHost", "noninteractive"]