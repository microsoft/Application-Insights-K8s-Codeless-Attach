package main

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/hpcloud/tail"
)

func tailFiles(files []os.FileInfo, folder string, follow bool) {
	for _, file := range files {
		var currentIndex int = -1
		var index int = 0
		// here we be tailing the file
		logEntry(fmt.Sprintf("tailing file %s", file.Name()), INFO)

		t, err := tail.TailFile(filepath.Join(folder, file.Name()), tail.Config{Follow: follow})
		if err != nil {
			logEntry(fmt.Sprintf("error tailing file %s", err), ERROR)
		}
		index = -1
		var accumulator string = ""
		for line := range t.Lines {
			index++

			if currentIndex >= index {
				continue
			}
			accumulator += strings.Trim(line.Text, "\r\n")
			if tryUpload(accumulator) {
				currentIndex = index
				accumulator = ""
			}
		}
	}
}

func pickupFiles(folder string, retry bool) ([]os.FileInfo, error) {

	var availableFiles []os.FileInfo
	var err error

	for {
		availableFiles, err = getFiles(folder)
		if err == nil && len(availableFiles) > 0 {
			for _, file := range availableFiles {
				logEntry(fmt.Sprintf("file :%s", file.Name()), INFO)
			}
			return availableFiles, nil
		} else if retry {
			logEntry("waiting for files to become available", INFO)
			time.Sleep(1 * time.Second)
		} else {
			logEntry("attempted to pickup files, nothing to report, not waiting", INFO)
			return nil, errors.New("No files detected")
		}
	}
}

func getFiles(folder string) ([]os.FileInfo, error) {
	if folder == "" {
		logEntry("error finding data", ERROR)
		return nil, errors.New("folder cannot be null")
	}

	files, err := ioutil.ReadDir(folder)
	if err != nil {
		logEntry(err.Error(), ERROR)
		return nil, err
	}

	for _, f := range files {
		logEntry(f.Name(), INFO)
	}
	return files, nil
}
