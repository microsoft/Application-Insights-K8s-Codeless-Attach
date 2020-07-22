package main

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"runtime"
	"time"
)

const windowsFolder = "./samples"
const linuxFolder = "/var/log/applicationinsights"

func main() {
	fmt.Println("Starting logs uploader.")

	folder := linuxFolder
	if runtime.GOOS == "windows" {
		folder = windowsFolder
	}

	availableFiles, err := pickupFiles(folder, false) // attempt to pick up files

	if err != nil {
		fmt.Println("No files available to upload at startup")
	} else {
		tailFiles(availableFiles)
	}

	fmt.Println("Done starting")

	availableFiles, _ = pickupFiles(folder, true)

	tailFiles(availableFiles)

	/*
		client := appinsights.NewTelemetryClient("320dcf98-173f-429b-ab39-df8b4951fb94")
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

func tailFiles(files []os.FileInfo) {
	for _, file := range files {
		// here we be tailing the file
		fmt.Println("tailing file", file.Name())
	}
}

func pickupFiles(folder string, retry bool) ([]os.FileInfo, error) {

	var availableFiles []os.FileInfo
	var err error

	for {
		availableFiles, err = getFiles(folder)
		if err == nil {
			for index, file := range availableFiles {
				fmt.Println(index, "=>", file.Name())
			}
			return availableFiles, nil
		} else if retry {
			fmt.Println("waiting for files to become available")
			time.Sleep(1 * time.Second)
		} else {
			fmt.Println("attempted to pickup files, nothing to report, not waiting")
			return nil, errors.New("No files detected")
		}
	}
}

func getFiles(folder string) ([]os.FileInfo, error) {
	if folder == "" {
		fmt.Println("error finding data")
		return nil, errors.New("folder cannot be null")
	}

	files, err := ioutil.ReadDir(folder)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	for _, f := range files {
		fmt.Println(f.Name())
	}
	return files, nil
}
