@echo off
echo Starting the backend server...
echo Please make sure you have your .env file configured with a SECRET_KEY
echo.

REM Check if .env file exists
if not exist "backend\.env" (
    echo Warning: backend\.env file not found!
    echo Copy backend\.env.example to backend\.env and add your SECRET_KEY
    echo Example:
    echo SECRET_KEY=your-super-secret-key-change-this-in-production
    echo.
)

REM Navigate to backend directory and start the server
cd backend
echo Starting server on http://localhost:8000...
start /b uvicorn main:app --reload --host 0.0.0.0 --port 8000
echo Server started in background. Check http://localhost:8000 in your browser.
echo.
echo To stop the server, run: taskkill /f /im uvicorn.exe