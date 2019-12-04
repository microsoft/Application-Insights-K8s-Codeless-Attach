setlocal
call docker build -t go-sample . --no-cache
call az acr login --name gearamaaks
call docker tag go-sample gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/go-sample:%1
call docker push gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/go-sample:%1
endlocal