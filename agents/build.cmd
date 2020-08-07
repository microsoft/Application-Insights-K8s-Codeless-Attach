setlocal

call docker build -t ai_agents:%1 . --no-cache
call az acr login --name aicommon
call docker tag ai_agents:%1 aicommon.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook-agents:%1
call docker push aicommon.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook-agents:%1

endlocal