setlocal

call docker build -t aitelemetry:%1 . --no-cache
call az acr login --name gearamaaks
call docker tag aitelemetry:%1 gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/aitelemetry:%1
call docker push gearamaaks.azurecr.io/public/applicationinsights/codeless-attach/aitelemetry:%1
endlocal