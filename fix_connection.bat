@echo off
echo Attempting to open ports 4000 and 8081 in Windows Firewall...
echo.

powershell -Command "New-NetFirewallRule -DisplayName 'PulseFit Backend' -Direction Inbound -LocalPort 4000 -Protocol TCP -Action Allow -Profile Private,Public"
if %errorlevel% neq 0 (
    echo Failed to open Port 4000. Make sure you use 'Run as Administrator'.
) else (
    echo Port 4000 (Backend) Opened Successfully.
)

echo.

powershell -Command "New-NetFirewallRule -DisplayName 'Expo Bundler' -Direction Inbound -LocalPort 8081 -Protocol TCP -Action Allow -Profile Private,Public"
if %errorlevel% neq 0 (
    echo Failed to open Port 8081. Make sure you use 'Run as Administrator'.
) else (
    echo Port 8081 (Expo) Opened Successfully.
)

echo.
echo Press any key to exit...
pause
