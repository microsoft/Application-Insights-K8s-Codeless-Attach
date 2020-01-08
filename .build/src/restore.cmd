cd /D "%~dp0"
cd .\..\..\src
call npm cache clean --force
call npm install 