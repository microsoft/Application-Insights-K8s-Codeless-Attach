setlocal
call docker build -t java-sample . --no-cache
call az acr login --name gearamaaks
call docker tag java-sample gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/java-sample:%1
call docker push gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/java-sample:%1
endlocal