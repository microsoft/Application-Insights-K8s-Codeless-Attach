package main

import (
	"fmt"
	"runtime"

	"github.com/microsoft/ApplicationInsights-Go/appinsights"
)

const windowsFolder = "./samples"
const linuxFolder = "/var/log/applicationinsights"

func main() {
	fmt.Println("Starting logs uploader.")

	client := appinsights.NewTelemetryClient("320dcf98-173f-429b-ab39-df8b4951fb94")

	folder := linuxFolder
	if runtime.GOOS == "windows" {
		folder = windowsFolder
	}

	availableFiles, err := pickupFiles(folder, false) // attempt to pick up files

	if err != nil {
		fmt.Println("No files available to upload at startup")
	} else {
		tailFiles(availableFiles, folder, false, client)
	}

	fmt.Println("Done starting")

	availableFiles, _ = pickupFiles(folder, true)

	tailFiles(availableFiles, folder, true, client)

	/*

		metric := appinsights.NewMetricTelemetry("Queue length", 1)
		event := appinsights.NewEventTelemetry("event")
		metric.Properties["Queue name"] = "queuename"
		client.Track(metric)
		client.Track(event)
		fmt.Println("Done starting")

		t, err := tail.TailFile("/var/log/nginx.log", tail.Config{Follow: true})
		if err != nil {
			panic(err)
		}
		for line := range t.Lines {
			fmt.Println(line.Text)
		}
	*/
}
