setlocal
cd /D "%~dp0"
cd .\..\..\src
call build.cmd || exit /b 1
endlocal