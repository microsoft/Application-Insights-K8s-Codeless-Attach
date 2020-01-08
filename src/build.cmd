call npm install || exit /b 1
call npm run clean || exit /b 1
call npm run build || exit /b 1
call npm run test || exit /b 1
call npm run lint || exit /b 1