@echo off
setlocal

for %%P in (8000 5173) do (
  for /f "tokens=5" %%I in ('netstat -ano ^| findstr ":%%P" ^| findstr "LISTENING"') do (
    taskkill /PID %%I /F >nul 2>&1
  )
)

echo Processos das portas 8000 e 5173 foram encerrados.

endlocal