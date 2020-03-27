setlocal
call docker build -t local-forwarder . --no-cache
call az acr login --name aicommon
call docker tag local-forwarder aicommon.azurecr.io/public/applicationinsights/codeless-attach/local-forwarder:%1
call docker push aicommon.azurecr.io/public/applicationinsights/codeless-attach/local-forwarder:%1
endlocal

