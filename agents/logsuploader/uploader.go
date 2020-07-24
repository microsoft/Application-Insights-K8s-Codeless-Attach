package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/microsoft/ApplicationInsights-Go/appinsights"
)

func tryUpload(maybeJSON string, client appinsights.TelemetryClient) bool {
	fmt.Println("attempting to parse and load", maybeJSON)
	result := false

	var deserialized map[string]interface{}

	err := json.Unmarshal([]byte(maybeJSON), &deserialized)

	if err == nil {
		event := appinsights.NewEventTelemetry("IPA event")
		for field, val := range deserialized {
			switch field {
			case "time":
				{
					eventTime, _ := time.Parse(val.(string), val.(string))
					event.SetTime(eventTime)
				}
			default:
				{
					event.Properties[field] = val.(string)
				}
			}
		}
		client.Track(event)
	} else {
		fmt.Println("not valid json ", maybeJSON)
	}

	return result
}
