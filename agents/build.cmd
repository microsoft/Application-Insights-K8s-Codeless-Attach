setlocal
call docker build -t mutating-webhook-agents . --no-cache
call az acr login --name applicationinsights
call docker tag mutating-webhook-agents applicationinsights.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook-agents:%1
call docker push applicationinsights.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook-agents:%1
endlocal