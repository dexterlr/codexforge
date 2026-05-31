function Invoke-CodexForgeSmokeGroup {
  param(
    [Parameter(Mandatory = $true)][string]$GroupName,
    [Parameter(Mandatory = $true)][string]$BaseUrl,
    [Parameter(Mandatory = $true)][string]$ScriptRoot,
    [Parameter(Mandatory = $true)][array]$Scripts,
    [switch]$Interactive,
    [switch]$ContinueOnMissingOptional,
    [switch]$StopOnFirstFailure
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
  Write-Host "Mode:     $(if ($Interactive) { "interactive" } else { "non-interactive" })"
  Write-Host ""

  Push-Location $repoRoot
  try {
    foreach ($item in $Scripts) {
      $name = [string]$item.Name
      $file = [string]$item.File
      $required = if ($item.ContainsKey("Required")) { [bool]$item.Required } else { $true }
      $path = Join-Path $ScriptRoot $file

      if ($seen.ContainsKey($file)) {
        $message = "[FAIL] Duplicate smoke script in $GroupName group: $file"
        Write-Host $message
        $results += [pscustomobject]@{
          Name = $name
          Status = "FAILED"
          Path = $path
          Detail = $message
        }
        if ($StopOnFirstFailure) { break }
        continue
      }
      $seen[$file] = $true

      if (-not (Test-Path $path)) {
        if ($required) {
          $message = "[FAIL] Required smoke script missing: $path"
          if ($file -eq "smoke-codexforge-real-product-run-fix.ps1") {
            $message = "$message`nThis smoke belongs to Phase 101 and has not been generated yet.`nRun Phase 101 first, then run the smoke."
          }
          Write-Host $message
          $results += [pscustomobject]@{
            Name = $name
            Status = "MISSING_REQUIRED"
            Path = $path
            Detail = $message
          }
          if ($StopOnFirstFailure) { break }
          continue
        }

        Write-Host "[WARN] $name - optional script not found: $path"
        $results += [pscustomobject]@{
          Name = $name
          Status = "MISSING_OPTIONAL"
          Path = $path
          Detail = "Optional smoke script missing."
        }
        continue
      }

      Write-Host "[RUN] $name"

      try {
        $scriptSource = Get-Content -Raw $path
        $supportsBaseUrl = $scriptSource -match '(?s)param\s*\(.*\$BaseUrl'
        $childArgs = @()
        if ($supportsBaseUrl) {
          $childArgs += @("-BaseUrl", $BaseUrl)
        }
        if ($scriptSource -match '(?s)param\s*\(.*\$Interactive' -and $Interactive) {
          $childArgs += "-Interactive"
        }
        if ($scriptSource -match '(?s)param\s*\(.*\$ContinueOnMissingOptional' -and $ContinueOnMissingOptional) {
          $childArgs += "-ContinueOnMissingOptional"
        }
        if ($scriptSource -match '(?s)param\s*\(.*\$StopOnFirstFailure' -and $StopOnFirstFailure) {
          $childArgs += "-StopOnFirstFailure"
        }

        & powershell -NoProfile -ExecutionPolicy Bypass -File $path @childArgs

        if ($LASTEXITCODE -ne 0) {
          throw "[FAIL] $name exited with code $LASTEXITCODE"
        }

        Write-Host "[PASS] $name"
        Write-Host ""

        $results += [pscustomobject]@{
          Name = $name
          Status = "PASS"
          Path = $path
          Detail = ""
        }
      } catch {
        $message = [string]$_
        Write-Host "[FAIL] $name"
        Write-Host $message
        Write-Host ""
        $results += [pscustomobject]@{
          Name = $name
          Status = "FAILED"
          Path = $path
          Detail = $message
        }
        if ($StopOnFirstFailure) { break }
      }
    }
  } finally {
    Pop-Location
    $env:CODEXFORGE_SMOKE_BASE_URL = $previousBaseUrl
  }

  $finishedAt = Get-Date
  $passed = @($results | Where-Object { $_.Status -eq "PASS" }).Count
  $failed = @($results | Where-Object { $_.Status -eq "FAILED" }).Count
  $missingRequired = @($results | Where-Object { $_.Status -eq "MISSING_REQUIRED" }).Count
  $missingOptional = @($results | Where-Object { $_.Status -eq "MISSING_OPTIONAL" }).Count

  Write-Host ""
  Write-Host "=== CodexForge $GroupName smoke group complete ==="
  Write-Host "Passed:           $passed"
  Write-Host "Failed:           $failed"
  Write-Host "Missing required: $missingRequired"
  Write-Host "Missing optional: $missingOptional"
  Write-Host "Elapsed: $([math]::Round(($finishedAt - $startedAt).TotalSeconds, 2))s"
  Write-Host ""

  foreach ($result in $results | Where-Object { $_.Status -ne "PASS" }) {
    Write-Host "[$($result.Status)] $($result.Name) - $($result.Path)"
    if ($result.Detail) {
      Write-Host $result.Detail
    }
  }

  if (($failed + $missingRequired) -gt 0) {
    throw "[FAIL] Required smoke scripts failed or missing for $GroupName."
  }

  if ($passed -lt 1) {
    throw "[FAIL] No smoke scripts ran for $GroupName."
  }

  Write-Host "[PASS] CodexForge $GroupName smoke group passed."
}
