setlocal
cd /D "%~dp0"
cd .\..\..\src
call dockerBuild.cmd testPipe
endlocal