param(
  [string]$BaseUrl = "http://localhost:3000",
  [int]$StartupTimeoutSeconds = 45
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== CodexForge smoke suite with managed dev server ==="
Write-Host "Base URL: $BaseUrl"

$repoRoot = Split-Path -Parent $PSScriptRoot
$smokeAllPath = Join-Path $PSScriptRoot "smoke-codexforge-all.ps1"

if (-not (Test-Path $smokeAllPath)) {
  throw "Missing smoke suite: $smokeAllPath"
}

function Test-CodexForgeServer {
  param([Parameter(Mandatory = $true)][string]$Url)

  try {
    $response = Invoke-WebRequest -UseBasicParsing `
      -Uri $Url `
      -Method GET `
      -TimeoutSec 3

    return [int]$response.StatusCode -ge 200 -and [int]$response.StatusCode -lt 500
  } catch {
    return $false
  }
}

function Wait-CodexForgeServer {
  param(
    [Parameter(Mandatory = $true)][string]$Url,
    [Parameter(Mandatory = $true)][int]$TimeoutSeconds
  )

  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)

  while ((Get-Date) -lt $deadline) {
    if (Test-CodexForgeServer -Url $Url) {
      return $true
    }

    Start-Sleep -Milliseconds 750
  }

  return $false
}

$startedServer = $false
$serverProcess = $null
$logDir = Join-Path $repoRoot ".codexforge"
$stdoutLog = Join-Path $logDir "smoke-dev-server.out.log"
$stderrLog = Join-Path $logDir "smoke-dev-server.err.log"

if (-not (Test-Path $logDir)) {
  New-Item -ItemType Directory -Path $logDir | Out-Null
}

try {
  if (Test-CodexForgeServer -Url $BaseUrl) {
    Write-Host "[PASS] existing dev server is reachable"
  } else {
    Write-Host "[RUN ] dev server is not reachable; starting npm run dev"

    $serverProcess = Start-Process `
      -FilePath "cmd.exe" `
      -ArgumentList @("/c", "npm", "run", "dev") `
      -WorkingDirectory $repoRoot `
      -RedirectStandardOutput $stdoutLog `
      -RedirectStandardError $stderrLog `
      -PassThru `
      -WindowStyle Hidden

    $startedServer = $true

    if (-not (Wait-CodexForgeServer -Url $BaseUrl -TimeoutSeconds $StartupTimeoutSeconds)) {
      Write-Host ""
      Write-Host "=== Dev server stdout tail ==="
      if (Test-Path $stdoutLog) {
        Get-Content $stdoutLog -Tail 80
      }

      Write-Host ""
      Write-Host "=== Dev server stderr tail ==="
      if (Test-Path $stderrLog) {
        Get-Content $stderrLog -Tail 80
      }

      throw "Timed out waiting for CodexForge dev server at $BaseUrl"
    }

    Write-Host "[PASS] managed dev server is reachable"
  }

  Write-Host ""
  Write-Host "=== Running full CodexForge smoke suite ==="

  & powershell -ExecutionPolicy Bypass -File $smokeAllPath

  if ($LASTEXITCODE -ne 0) {
    throw "CodexForge smoke suite failed with exit code $LASTEXITCODE."
  }

  Write-Host ""
  Write-Host "[OK] CodexForge managed smoke suite passed"
} finally {
  if ($startedServer -and $serverProcess -and -not $serverProcess.HasExited) {
    Write-Host ""
    Write-Host "[RUN ] stopping managed dev server pid=$($serverProcess.Id)"

    try {
      Stop-Process -Id $serverProcess.Id -Force -ErrorAction Stop
      Write-Host "[PASS] managed dev server stopped"
    } catch {
      Write-Host "[WARN] Could not stop managed dev server: $($_.Exception.Message)"
    }
  }
}
