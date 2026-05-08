param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot

$scripts = @(
  @{
    Name = "Product surface UI"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-product-surface-ui.ps1"
    Required = $true
  },
  @{
    Name = "Product surface planning"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-product-surface-planning.ps1"
    Required = $true
  },
  @{
    Name = "Tool adapter registry"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-tool-adapter-registry.ps1"
    Required = $true
  },
  @{
    Name = "Capability bridge"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-capability-bridge.ps1"
    Required = $true
  },
  @{
    Name = "Self-upgrade backlog"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-self-upgrade.ps1"
    Required = $true
  },
  @{
    Name = "Tool-policy UI"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-tool-policy-ui.ps1"
    Required = $true
  },
  @{
    Name = "Tool approval retry API"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-tool-approval-retry-api.ps1"
    Required = $true
  },
  @{
    Name = "Capability routing"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-capability-routing.ps1"
    Required = $false
  },
  @{
    Name = "Latest-message authority"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-latest-message-authority.ps1"
    Required = $false
  },
  @{
    Name = "Premium response composer"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-premium-response-composer.ps1"
    Required = $true
  },
  @{
    Name = "Final response validation"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-final-response-validation.ps1"
    Required = $true
  },
  @{
    Name = "Domain alignment"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-domain-alignment.ps1"
    Required = $true
  },
  @{
    Name = "Route override visible meta"
    Path = Join-Path $PSScriptRoot "smoke-codexforge-route-override-visible-meta.ps1"
    Required = $false
  }
)

$startedAt = Get-Date
$results = @()

Write-Host ""
Write-Host "=== CodexForge smoke suite ==="
Write-Host "Base URL: $BaseUrl"
Write-Host "Started:  $($startedAt.ToString("s"))"
Write-Host ""

foreach ($item in $scripts) {
  $name = [string]$item.Name
  $path = [string]$item.Path
  $required = [bool]$item.Required

  if (-not (Test-Path $path)) {
    if ($required) {
      throw "[FAIL] Required smoke script missing: $path"
    }

    Write-Host "[SKIP] $name - script not found"
    $results += [pscustomobject]@{
      Name = $name
      Status = "SKIP"
      Path = $path
    }
    continue
  }

  Write-Host "[RUN ] $name"

  try {
    & powershell -ExecutionPolicy Bypass -File $path -BaseUrl $BaseUrl

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

$finishedAt = Get-Date
$passed = @($results | Where-Object { $_.Status -eq "PASS" }).Count
$skipped = @($results | Where-Object { $_.Status -eq "SKIP" }).Count

Write-Host ""
Write-Host "=== CodexForge smoke suite complete ==="
Write-Host "Passed:  $passed"
Write-Host "Skipped: $skipped"
Write-Host "Elapsed: $([math]::Round(($finishedAt - $startedAt).TotalSeconds, 2))s"
Write-Host ""

if ($passed -lt 1) {
  throw "[FAIL] No smoke scripts ran."
}

Write-Host "[OK] CodexForge smoke suite passed."
