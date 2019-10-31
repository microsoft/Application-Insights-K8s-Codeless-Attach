setlocal
call docker build -t local-forwarder . --no-cache
call az acr login --name gearamaaks
call docker tag local-forwarder gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/local-forwarder:%1
call docker push gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/local-forwarder:%1
endlocal

