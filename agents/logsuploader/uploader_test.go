package main

import (
	"testing"
	"time"
)

//CreateEventTest1 ...
func TestCreateEvent1(t *testing.T) {
	var d Event
	result := createEvent(d)

	if result == nil {
		t.Error("null result")
	}

	if result.Properties["Level"] != "" &&
		result.Properties["Logger"] != "" &&
		result.Properties["Message"] != "" {
		t.Error("bases are not empty")
	}

	if result.Properties["Operation"] != "" &&
		result.Properties["SiteName"] != "" &&
		result.Properties["Ikey"] != "" &&
		result.Properties["ExtensionVersion"] != "" &&
		result.Properties["SdkVersion"] != "" &&
		result.Properties["SubscriptionID"] != "" {
		t.Error("Properties are not empty")
	}

}

func TestCreateEvent2(t *testing.T) {
	var d Event

	d.Level = "1"
	d.Logger = "2"
	d.Message = "3"
	d.Time = time.Now().String()
	d.Properties.Operation = "5"
	d.Properties.SiteName = "6"
	d.Properties.Ikey = "7"
	d.Properties.ExtensionVersion = "8"
	d.Properties.SdkVersion = "9"
	d.Properties.SubscriptionID = "0"

	result := createEvent(d)

	if result == nil {
		t.Error("null result")
	}

	if result.Properties["Level"] != "1" &&
		result.Properties["Logger"] != "2" &&
		result.Properties["Message"] != "3" &&
		result.Time().String() != d.Time {
		t.Error("bases invalid")
	}

	if result.Properties["Operation"] != "5" &&
		result.Properties["SiteName"] != "6" &&
		result.Properties["Ikey"] != "7" &&
		result.Properties["ExtensionVersion"] != "8" &&
		result.Properties["SdkVersion"] != "9" &&
		result.Properties["SubscriptionID"] != "0" {
		t.Error("Properties invalid")
	}

}

func TestCreateEvent3(t *testing.T) {
	var d Event

	d.Level = "1"
	d.Logger = "2"
	d.Message = "3"
	d.Time = time.Now().String()

	result := createEvent(d)

	if result == nil {
		t.Error("null result")
	}

	if result.Properties["Level"] != "1" &&
		result.Properties["Logger"] != "2" &&
		result.Properties["Message"] != "3" &&
		result.Time().String() != d.Time {
		t.Error("bases invalid")
	}

	if result.Properties["Operation"] != "" &&
		result.Properties["SiteName"] != "" &&
		result.Properties["Ikey"] != "" &&
		result.Properties["ExtensionVersion"] != "" &&
		result.Properties["SdkVersion"] != "" &&
		result.Properties["SubscriptionID"] != "" {
		t.Error("Properties are not empty")
	}

}

func TestTryUpload1(t *testing.T) {
	//var client appinsights.TelemetryClient

	result := tryUpload("dfsd")

	if result != false {
		t.Error("false")
	}
}

func TestTryUpload2(t *testing.T) {
	//var client appinsights.TelemetryClient

	result := tryUpload("")

	if result != false {
		t.Error("false")
	}
}

func TestTryUpload3(t *testing.T) {

	result := tryUpload("{}")

	if result != true {
		t.Error("true")
	}
}
