setlocal
cd /D "%~dp0"
cd .\..\..\src
call dockerBuild.cmd %1
endlocal