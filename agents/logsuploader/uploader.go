package main

import (
	"encoding/json"
	"fmt"

	"github.com/microsoft/ApplicationInsights-Go/appinsights"
)

func tryUpload(maybeJSON string, client appinsights.TelemetryClient) bool {
	fmt.Println("attempting to parse and load", maybeJSON)
	result := false

	var deserialized Event

	err := json.Unmarshal([]byte(maybeJSON), &deserialized)

	if err == nil {
		event := createEvent(deserialized)
		client.Track(event)
		result = true
	} else {
		fmt.Println("not valid json ", maybeJSON)
	}

	return result
}

func createEvent(deserialized Event) *appinsights.EventTelemetry {

	event := appinsights.NewEventTelemetry("IPA event")
	event.SetTime(deserialized.Time)
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
