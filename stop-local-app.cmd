@echo off
setlocal
cd /d "%~dp0"

docker compose -f infrastructure/docker-compose.yml --profile dev down

if errorlevel 1 (
    echo Failed to stop the Docker stack.
    exit /b 1
)

echo NHL app local stack stopped.
exit /b 0
