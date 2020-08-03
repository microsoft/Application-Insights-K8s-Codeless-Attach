package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/microsoft/ApplicationInsights-Go/appinsights"
)

func tryUpload(maybeJSON string) bool {
	result := false

	var deserialized Event

	err := json.Unmarshal([]byte(maybeJSON), &deserialized)

	if err == nil {
		event := createEvent(deserialized)
		client.Track(event)
		client.Channel().Flush()
		result = true
	}

	return result
}

func createEvent(deserialized Event) *appinsights.EventTelemetry {

	event := appinsights.NewEventTelemetry("IPA")

	eventTime, err := time.Parse(deserialized.Time, deserialized.Time)

	if err != nil {
		event.SetTime(eventTime)
	}

	//event.SetTime(deserialized.Time)
	event.Properties["Time"] = deserialized.Time
	event.Properties["Level"] = deserialized.Level
	event.Properties["Logger"] = deserialized.Logger
	event.Properties["Message"] = deserialized.Message

	event.Properties["Operation"] = deserialized.Properties.Operation
	event.Properties["SiteName"] = deserialized.Properties.SiteName
	event.Properties["Ikey"] = deserialized.Properties.Ikey
	event.Properties["ExtensionVersion"] = deserialized.Properties.ExtensionVersion
	event.Properties["SdkVersion"] = deserialized.Properties.SdkVersion
	event.Properties["SubscriptionID"] = deserialized.Properties.SubscriptionID

	return event
}

func logEntry(line string, level LogLevel) {
	event := appinsights.NewEventTelemetry("LOGGER")

	event.SetTime(time.Now())
	event.Properties["Level"] = string(level)
	event.Properties["Message"] = line

	client.Track(event)
	client.Channel().Flush()

	if level == ERROR ||
		level == CONSOLE {
		fmt.Println(line)
	}

}
