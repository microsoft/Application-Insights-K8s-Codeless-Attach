setlocal
set GOOS=linux
go build -o logsuploader
set GOOS=windows
go build -o logsuploader.exe
endlocal