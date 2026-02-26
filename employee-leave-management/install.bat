@echo off
echo ========================================
echo Installing Dependencies
echo ========================================
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
cd ..

echo.
echo Installing Frontend Dependencies...
cd frontend
call npm install
cd ..

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Ensure MongoDB is running
echo 2. Copy backend/.env.example to backend/.env
echo 3. Update the .env file with your settings
echo 4. Run start.bat to start both servers
echo.
pause
