setlocal
REM we need download here
set ZIP_NAME=ApplicationInsightsAgent.%2.zip
set AGENT_VERSION=%2

md agents
call tar -xf .\zips\%ZIP_NAME% -C .\agents

cd agents
ren %AGENT_VERSION% current
cd ..

call docker build -t mutating-webhook-agents . --no-cache
call az acr login --name aicommon
call docker tag mutating-webhook-agents aicommon.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook-agents:%1
call docker push aicommon.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook-agents:%1
call rd /s /q .\agents
endlocal