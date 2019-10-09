setlocal
call docker build -t mutating-webhook . --no-cache
call az acr login --name gearamaaks
call docker tag mutating-webhook gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook:%1
call docker push gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/mutating-webhook:%1
endlocal