@echo off
cd Matrimony\frontend-react
echo Installing dependencies...
call npm install --legacy-peer-deps
echo Building frontend...
call npx vite build
echo Build complete!
pause
