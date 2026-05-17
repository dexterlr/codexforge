function Invoke-CodexForgeSmokeGroup {
  param(
    [Parameter(Mandatory = $true)][string]$GroupName,
    [Parameter(Mandatory = $true)][string]$BaseUrl,
    [Parameter(Mandatory = $true)][string]$ScriptRoot,
    [Parameter(Mandatory = $true)][array]$Scripts
  )

  $repoRoot = Split-Path -Parent $ScriptRoot
  $startedAt = Get-Date
  $results = @()
  $seen = @{}
  $previousBaseUrl = $env:CODEXFORGE_SMOKE_BASE_URL
  $env:CODEXFORGE_SMOKE_BASE_URL = $BaseUrl

  Write-Host ""
  Write-Host "=== CodexForge $GroupName smoke group ==="
  Write-Host "Base URL: $BaseUrl"
  Write-Host "Started:  $($startedAt.ToString("s"))"
  Write-Host ""

  Push-Location $repoRoot
  try {
    foreach ($item in $Scripts) {
      $name = [string]$item.Name
      $file = [string]$item.File
      $required = if ($item.ContainsKey("Required")) { [bool]$item.Required } else { $true }
      $path = Join-Path $ScriptRoot $file

      if ($seen.ContainsKey($file)) {
        throw "[FAIL] Duplicate smoke script in $GroupName group: $file"
      }
      $seen[$file] = $true

      if (-not (Test-Path $path)) {
        if ($required) {
          throw "[FAIL] Required smoke script missing: $path"
        }

        Write-Host "[SKIP] $name - optional script not found"
        $results += [pscustomobject]@{
          Name = $name
          Status = "SKIP"
          Path = $path
        }
        continue
      }

      Write-Host "[RUN] $name"

      try {
        $scriptSource = Get-Content -Raw $path
        $supportsBaseUrl = $scriptSource -match '(?s)param\s*\(.*\$BaseUrl'

        if ($supportsBaseUrl) {
          & powershell -ExecutionPolicy Bypass -File $path -BaseUrl $BaseUrl
        } else {
          & powershell -ExecutionPolicy Bypass -File $path
        }

        if ($LASTEXITCODE -ne 0) {
          throw "[FAIL] $name exited with code $LASTEXITCODE"
        }

        Write-Host "[PASS] $name"
        Write-Host ""

        $results += [pscustomobject]@{
          Name = $name
          Status = "PASS"
          Path = $path
        }
      } catch {
        Write-Host "[FAIL] $name"
        Write-Host $_
        throw
      }
    }
  } finally {
    Pop-Location
    $env:CODEXFORGE_SMOKE_BASE_URL = $previousBaseUrl
  }

  $finishedAt = Get-Date
  $passed = @($results | Where-Object { $_.Status -eq "PASS" }).Count
  $skipped = @($results | Where-Object { $_.Status -eq "SKIP" }).Count

  Write-Host ""
  Write-Host "=== CodexForge $GroupName smoke group complete ==="
  Write-Host "Passed:  $passed"
  Write-Host "Skipped: $skipped"
  Write-Host "Elapsed: $([math]::Round(($finishedAt - $startedAt).TotalSeconds, 2))s"
  Write-Host ""

  if ($passed -lt 1) {
    throw "[FAIL] No smoke scripts ran for $GroupName."
  }

  Write-Host "[PASS] CodexForge $GroupName smoke group passed."
}
