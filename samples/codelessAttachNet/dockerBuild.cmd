setlocal
call docker build -t netcore-sample . --no-cache
call az acr login --name gearamaaks
call docker tag netcore-sample gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/netcore-sample:%1
call docker push gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/netcore-sample:%1
endlocal