@echo off
echo Starting PulseFit Frontend on LAN (10.236.122.122)...
echo.
echo NOTE: Ensure your Backend is running separately (npm start in backend folder).
echo.

cd frontend
powershell -Command "$env:REACT_NATIVE_PACKAGER_HOSTNAME='10.236.122.122'; npx expo start --lan --clear"
pause
