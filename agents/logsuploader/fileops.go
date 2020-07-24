package main

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"

	"github.com/hpcloud/tail"
)

func tailFiles(files []os.FileInfo, folder string, follow bool) {
	for _, file := range files {
		var currentIndex int = -1
		var index int = 0
		// here we be tailing the file
		fmt.Println("tailing file", file.Name())

		t, err := tail.TailFile(filepath.Join(folder, file.Name()), tail.Config{Follow: follow})
		if err != nil {
			fmt.Println("error tailing file", err)
		}
		index = -1
		for line := range t.Lines {
			index++

			if currentIndex >= index {
				continue
			}

			currentIndex = index
			fmt.Println(line.Text)
		}
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
