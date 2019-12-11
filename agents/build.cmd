setlocal
REM we need download here
REM call tar -xf .\agents.zip -C .\agents
call docker build -t mutating-webhook-agents . --no-cache --build-arg AGENT_VERSION=%2
call az acr login --name applicationinsights
call docker tag mutating-webhook-agents applicationinsights.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook-agents:%1
call docker push applicationinsights.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook-agents:%1
REM call rd /s /q .\agents
endlocal