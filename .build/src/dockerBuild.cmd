setlocal
pushd
cd ..\..\src
call dockerBuild.cmd %1
popd
endlocal