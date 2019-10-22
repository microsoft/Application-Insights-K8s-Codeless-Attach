setlocal

cd codelessAttachJava
call dockerBuild.cmd %1
cd ..\codelessAttachNet
call dockerBuild.cmd %1
cd ..\codelessAttachNode
call dockerBuild.cmd %1

endlocal
