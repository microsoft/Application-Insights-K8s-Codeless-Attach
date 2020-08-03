package main

import (
	"errors"
	"io/ioutil"
	"os"
	"time"

	"github.com/mitchellh/go-ps"

	"github.com/microsoft/ApplicationInsights-Go/appinsights"
)

var client appinsights.TelemetryClient

func main() {
	logEntry("Starting logs uploader.", CONSOLE)

	if checkFirstInstance() == false {
		logEntry("Already Running", CONSOLE)
		logEntry("Done starting", CONSOLE)
		return
	}

	folder, err := getTargetFolder(false, nil)

	availableFiles, err := pickupFiles(folder, false) // attempt to pick up files
	client = appinsights.NewTelemetryClient(getTelemetryTarget())

	if err != nil {
		logEntry("No files available to upload at startup", INFO)
	} else {
		tailFiles(availableFiles, folder, false)
	}

	logEntry("Done starting", CONSOLE)

	folder, err = getTargetFolder(true, nil)

	availableFiles, _ = pickupFiles(folder, true)

	tailFiles(availableFiles, folder, true)
}

func checkFirstInstance() bool {
	procs, err := ps.Processes()

	if err != nil {
		return true

	}
	var found = 0
	for index := range procs {
		if procs[index].Executable() == "logsuploader" || procs[index].Executable() == "logsuploader.exe" {
			found++
			if found > 1 {
				return false
			}
		}
	}

	return true
}

func getTargetFolder(wait bool, alternates []string) (string, error) {
	folders := []string{
		"./samples",
		"/var/log/applicationinsights",
		"/var/log/ApplicationInsights",
	}

	if alternates != nil && len(alternates) > 0 {
		folders = alternates
	}

	for {
		for _, elem := range folders {
			_, err := ioutil.ReadDir(elem)
			if err == nil {
				return elem, nil
			}

		}
		if wait == true {
			time.Sleep(1 * time.Second)
		} else {
			break
		}
	}

	return "", errors.New("no folder")
}

func getTelemetryTarget() string {
	var target string

	if os.Getenv("TELEMETRY_IKEY") != "" {
		target = os.Getenv("TELEMETRY_IKEY")
	} else if os.Getenv("TELEMETRY_CONN_STRING") != "" {
		target = os.Getenv("TELEMETRY_CONN_STRING")
	} else {
		target = "320dcf98-173f-429b-ab39-df8b4951fb94"
	}

	return target
}
