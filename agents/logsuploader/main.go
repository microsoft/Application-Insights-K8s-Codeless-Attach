package main

import (
	"fmt"
	"os"
	"runtime"

	"github.com/microsoft/ApplicationInsights-Go/appinsights"
)

func main() {
	fmt.Println("Starting logs uploader.")

	client := appinsights.NewTelemetryClient(getTelemetryTarget())

	folder := getTargetFolder()

	availableFiles, err := pickupFiles(folder, false) // attempt to pick up files

	if err != nil {
		fmt.Println("No files available to upload at startup")
	} else {
		tailFiles(availableFiles, folder, false, client)
	}

	fmt.Println("Done starting")

	availableFiles, _ = pickupFiles(folder, true)

	tailFiles(availableFiles, folder, true, client)
}

func getTargetFolder() string {
	windowsFolder := "./samples"
	linuxFolder := "/var/log/applicationinsights"

	folder := linuxFolder
	if runtime.GOOS == "windows" {
		folder = windowsFolder
	}

	return folder
}

func getTelemetryTarget() string {
	var target string

	if os.Getenv("TELEMETRY_IKEY") != "" {
		target = os.Getenv("TELEMETRY_IKEY")
	} else if os.Getenv("TELEMETRY_CONN_STRING") != "" {
		target = os.Getenv("TELEMETRY_CONN_STRING")
	} else {
		target = "00000000-0000-0000-0000-000000000000"
	}

	return target
}
