$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

$pythonExe = Join-Path $env:LOCALAPPDATA 'Programs\Python\Python314\python.exe'
if (-not (Test-Path $pythonExe)) {
    $pythonExe = Join-Path $rootDir '.venv\Scripts\python.exe'
}
if (-not (Test-Path $pythonExe)) {
    $pythonExe = 'python'
}

$envFile = Join-Path $rootDir '.env'
$envExample = Join-Path $rootDir '.env.example'
if (-not (Test-Path $envFile) -and (Test-Path $envExample)) {
    Copy-Item $envExample $envFile
}

Write-Host 'Iniciando backend em http://127.0.0.1:8000'
$backendCommand = ('"{0}" -m uvicorn Export.main:app --host 127.0.0.1 --port 8000' -f $pythonExe)
Start-Process -WorkingDirectory $rootDir -FilePath 'cmd.exe' -ArgumentList @('/k', $backendCommand)

Write-Host 'Iniciando frontend em http://127.0.0.1:5173'
$frontendCommand = 'npm.cmd run dev -- --host 127.0.0.1 --port 5173'
Start-Process -WorkingDirectory (Join-Path $rootDir 'NEW_UI') -FilePath 'cmd.exe' -ArgumentList @('/k', $frontendCommand)

Start-Process 'http://127.0.0.1:5173/'

Write-Host 'Aplicacao iniciada.'
Write-Host 'Backend: http://127.0.0.1:8000'
Write-Host 'Frontend: http://127.0.0.1:5173'