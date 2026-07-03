param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2306 Provider Gateway Smoke Coverage Guard"
  ScriptFile = "smoke-codexforge-provider-gateway-smoke-coverage-guard.ps1"
  Domain = "provider-gateway-smoke-coverage-guard"
  Route = "provider-gateway-smoke-coverage-guard"
  CommandLabel = "Go to Provider Gateway Smoke Coverage Guard"
  RouteHref = "/provider-gateway-smoke-coverage-guard"
  Markers = @("Provider gateway smoke coverage guard", "Provider gateway smoke coverage guard verifies provider gateway batch has targeted smoke scripts and all-smoke registration without removing previous coverage", "Provider gateway smoke coverage guard keeps smoke scanning scoped to provider gateway batch-owned files to avoid old helper false positives", "Provider gateway smoke coverage guard preserves checkpoint smoke coverage", "Denied provider gateway smoke coverage regression paths remain blocked", "Provider gateway smoke coverage checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
