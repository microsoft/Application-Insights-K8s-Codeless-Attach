FROM iron/go:dev

WORKDIR /app

ENV SRC_DIR=/go/src/github.com/lmolkova/go-app/
ADD . $SRC_DIR

RUN go get -u go.opencensus.io
RUN go get -u contrib.go.opencensus.io/exporter/ocagent
RUN cd $SRC_DIR; go build -o goapp; cp goapp /app/

EXPOSE 50030

ENTRYPOINT ["./goapp"]