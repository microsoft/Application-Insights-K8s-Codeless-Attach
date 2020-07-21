package main

import (
	"fmt"

	"github.com/microsoft/ApplicationInsights-Go/appinsights"
)

func main() {
	fmt.Println("Hello, logs uploader.")
	var name string
	client := appinsights.NewTelemetryClient("320dcf98-173f-429b-ab39-df8b4951fb94")
	metric := appinsights.NewMetricTelemetry("Queue length", 1)
	event := appinsights.NewEventTelemetry("event")
	metric.Properties["Queue name"] = "queuename"
	client.Track(metric)
	client.Track(event)
	fmt.Println("Done starting")
	fmt.Scan(&name)
	/*t, err := tail.TailFile("/var/log/nginx.log", tail.Config{Follow: true})
	if err != nil {
		panic(err)
	}
	for line := range t.Lines {
		fmt.Println(line.Text)
	}*/
}
