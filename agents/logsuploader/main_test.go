package main

import (
	"os"
	"testing"
)

func TestGetTargetFolder(t *testing.T) {
	folder, err := getTargetFolder(false, nil)
	if "./samples" != folder && err != nil {
		t.Error("incorrect")
	}
}

func TestGetTargetFolder2(t *testing.T) {
	folder, err := getTargetFolder(false,
		[]string{"a", "b", "./samples"})

	if "./samples" != folder && err != nil {
		t.Error("incorrect")
	}
}

func TestGetTargetFolder3(t *testing.T) {
	folder, err := getTargetFolder(true, nil)
	if "./samples" != folder && err != nil {
		t.Error("incorrect")
	}
}

func TestGetTargetFolder4(t *testing.T) {
	folder, err := getTargetFolder(true,
		[]string{"a", "b", "./samples"})

	if "./samples" != folder && err != nil {
		t.Error("incorrect")
	}
}

func TestGetTelemetryTarget1(t *testing.T) {
	if getTelemetryTarget() != "320dcf98-173f-429b-ab39-df8b4951fb94" {
		t.Error("Telemetry")
	}
}

func TestGetTelemetryTarget2(t *testing.T) {
	os.Setenv("TELEMETRY_IKEY", "123")
	if getTelemetryTarget() != "123" {
		t.Error("Telemetry")
	}
	os.Setenv("TELEMETRY_IKEY", "")
}

func TestGetTelemetryTarget3(t *testing.T) {
	os.Setenv("TELEMETRY_CONN_STRING", "abc")
	if getTelemetryTarget() != "abc" {
		t.Error("Telemetry")
	}
	os.Setenv("TELEMETRY_CONN_STRING", "")
}

func TestCheckInstance(t *testing.T) {
	if checkFirstInstance() != true {
		t.Error("instance")
	}
}
