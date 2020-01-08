cd /D "%~dp0"
dir
cd .\..\..\src
call build.cmd || exit /b 1
