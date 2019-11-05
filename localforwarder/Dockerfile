FROM buildpack-deps:jessie
#RUN apk update && apk add libintl libstdc++ openssl libc6-compat
COPY /LF-ConsoleHost-linux-x64/ /bin/
WORKDIR /bin
RUN chmod +x /bin/Microsoft.LocalForwarder.ConsoleHost
EXPOSE 50001
EXPOSE 50002
ENTRYPOINT ["/bin/Microsoft.LocalForwarder.ConsoleHost", "noninteractive"]