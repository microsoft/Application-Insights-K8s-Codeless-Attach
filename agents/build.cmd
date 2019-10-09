setlocal
call docker build -t mutating-webhook-agents . --no-cache
call az acr login --name gearamaaks
call docker tag mutating-webhook-agents gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook-agents:%1
call docker push gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook-agents:%1
endlocal