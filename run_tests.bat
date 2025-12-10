@echo off
echo Running Authentication System Tests...
echo Make sure the backend server is running on http://localhost:8000
echo.

REM Run the tests
python test_auth.py

echo.
echo Tests completed. Check the output above for results.