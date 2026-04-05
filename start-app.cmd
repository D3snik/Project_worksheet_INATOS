@echo off
setlocal

set "ROOT_DIR=%~dp0"
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%ROOT_DIR%\start-app.ps1"

endlocal