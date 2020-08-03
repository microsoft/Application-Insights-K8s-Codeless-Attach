package main

import (
	"os"
	"testing"
	"time"

	"github.com/microsoft/ApplicationInsights-Go/appinsights"
)

func TestMain(m *testing.M) {
	client = appinsights.NewTelemetryClient("00000000-0000-0000-0000-000000000000")
	// call flag.Parse() here if TestMain uses flags
	os.Exit(m.Run())
}

func TestGetFiles1(t *testing.T) {
	files, err := getFiles("")

	if files != nil || err == nil {
		t.Error("files, err")
	}
}

func TestGetFiles2(t *testing.T) {
	files, err := getFiles("./gjgjghhj")

	if files != nil || err == nil {
		t.Error("files, err")
	}
}

func TestGetFiles3(t *testing.T) {
	files, err := getFiles("./samples")

	if files == nil || err != nil {
		t.Error("files, err")
	}

	if len(files) != 2 {
		t.Error("invalid length")
	}

	if !IsValidFile(files[0].Name()) ||
		!IsValidFile(files[1].Name()) {
		t.Error("invalid files")
	}
}

func TestPickupFiles1(t *testing.T) {
	files, err := pickupFiles("", false)

	if files != nil || err == nil {
		t.Error("files, err")
	}
}

func TestPickupFiles2(t *testing.T) {
	files, err := pickupFiles("./gjgjghhj", false)

	if files != nil || err == nil {
		t.Error("files, err")
	}
}

func TestPickupFiles3(t *testing.T) {
	files, err := pickupFiles("./samples", false)

	if files == nil || err != nil {
		t.Error("files, err")
	}

	if len(files) != 2 {
		t.Error("invalid length")
	}

	if !IsValidFile(files[0].Name()) ||
		!IsValidFile(files[1].Name()) {
		t.Error("invalid files")
	}

	if err != nil {
		t.Error("err")
	}
}

func TestPickupFiles4(t *testing.T) {
	os.RemoveAll("./testFolder")
	_ = os.Mkdir("./testFolder", os.ModePerm)

	files := runParallel("./testFolder/test.txt", "./testFolder")

	os.Create("./testFolder/test.txt")

	if len(files) != 1 {
		t.Error("invalid length")
	}

	if !IsValidFile(files[0].Name()) {
		t.Error("invalid files")
	}

	os.RemoveAll("./testFolder")
}

func runParallel(file string, folder string) []os.FileInfo {
	out1 := make(chan []os.FileInfo)
	out2 := make(chan bool)
	go func() {
		out2 <- createFile(file)
	}()
	go func() {
		out1 <- monitorFiles(folder)
	}()
	for {
		for file := range out1 {
			return file
		}
	}
}

func createFile(file string) bool {
	time.Sleep(2 * time.Second)
	os.Create(file)
	return true
}

func monitorFiles(path string) []os.FileInfo {
	files, _ := pickupFiles("./testFolder", true)

	return files
}

func IsValidFile(fileName string) bool {
	switch fileName {
	case
		"node.txt",
		"java.txt",
		"test.txt":
		{
			return true
		}
	}
	return false
}
