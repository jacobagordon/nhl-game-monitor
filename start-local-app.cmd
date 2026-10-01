@echo off
setlocal EnableExtensions
cd /d "%~dp0"

set "DOCKER_DESKTOP_EXE=%LOCALAPPDATA%\Programs\DockerDesktop\Docker Desktop.exe"
if not exist "%DOCKER_DESKTOP_EXE%" set "DOCKER_DESKTOP_EXE=C:\Program Files\Docker\Docker\Docker Desktop.exe"

where docker >nul 2>nul
if errorlevel 1 (
    echo Docker was not found on PATH.
    echo Please install Docker Desktop, then run this shortcut again.
    if exist "%DOCKER_DESKTOP_EXE%" start "" "%DOCKER_DESKTOP_EXE%"
    exit /b 1
)

:wait_for_docker
docker info >nul 2>nul
if errorlevel 1 (
    echo Docker is not running yet. Starting Docker Desktop...
    if exist "%DOCKER_DESKTOP_EXE%" start "" "%DOCKER_DESKTOP_EXE%"
    echo Waiting for Docker to become ready...
    timeout /t 10 >nul
    goto wait_for_docker
)

echo Starting NHL app local stack...
docker compose -f infrastructure/docker-compose.yml --profile dev up -d --build --wait
if errorlevel 1 (
    echo Failed to start the Docker stack.
    echo Container status:
    docker compose -f infrastructure/docker-compose.yml --profile dev ps
    exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "$success = $false; for ($i = 0; $i -lt 90; $i++) { try { $null = Invoke-WebRequest -Uri 'http://127.0.0.1:5173' -TimeoutSec 3 -UseBasicParsing; $success = $true; break } catch {} ; Start-Sleep -Seconds 2 }; if (-not $success) { exit 1 }"
if errorlevel 1 (
    echo The app did not become ready within the timeout window.
    echo Container status:
    docker compose -f infrastructure/docker-compose.yml --profile dev ps
    exit /b 1
)

echo App is ready. Opening the browser...
start "" http://127.0.0.1:5173

echo Done.
exit
