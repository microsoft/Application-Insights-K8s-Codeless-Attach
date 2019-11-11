setlocal
call docker build -t mutating-webhook . --no-cache
call az acr login --name applicationinsights
call docker tag mutating-webhook applicationinsights.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook:%1
call docker push applicationinsights.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook:%1
endlocal