setlocal
call docker build -t nodejs-sample . --no-cache
call az acr login --name gearamaaks
call docker tag nodejs-sample gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/nodejs-sample:%1
call docker push gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/nodejs-sample:%1
endlocal