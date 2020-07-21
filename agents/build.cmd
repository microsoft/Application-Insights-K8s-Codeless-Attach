setlocal

call docker build -t ai_agents:%1 . --no-cache
call az acr login --name gearamaaks
call docker tag ai_agents:%1 gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/ai_agents:%1
call docker push gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/ai_agents:%1

endlocal