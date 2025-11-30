@echo off
REM Matrimonial Matchmaking Platform - Quick Start
REM ================================================

echo.
echo  *** Matrimonial Matchmaking Platform ***
echo  =========================================
echo.

REM Check if server is already running
netstat -ano | findstr :5000 >nul
if errorlevel 1 (
  echo [*] Starting Backend Server...
  cd server
  start cmd /k "node server/server.js"
  cd ..
  timeout /t 2 /nobreak
  echo [OK] Backend server started on port 5000
) else (
  echo [!] Server already running on port 5000
)

echo.
echo [*] Frontend available at: http://localhost:5000
echo.
echo [*] Features:
echo     - User Registration and Login
echo     - Browse Matches
echo     - Search (Name, Profession, Location)
echo     - Shortlist Management
echo     - Media Upload
echo     - Family Details
echo     - Events and Recognition
echo.
echo [*] Ready to use!
echo     Press any key to continue or open browser at http://localhost:5000
echo.
pause

REM Open browser
start http://localhost:5000

echo.
echo [OK] Platform is running!
echo [*] To stop the server, close the server command window
echo.
