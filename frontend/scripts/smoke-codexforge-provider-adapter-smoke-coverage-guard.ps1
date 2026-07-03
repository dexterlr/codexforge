param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2339 Provider Adapter Smoke Coverage Guard"
  ScriptFile = "smoke-codexforge-provider-adapter-smoke-coverage-guard.ps1"
  Domain = "provider-adapter-smoke-coverage-guard"
  Route = "provider-adapter-smoke-coverage-guard"
  CommandLabel = "Go to Provider Adapter Smoke Coverage Guard"
  RouteHref = "/provider-adapter-smoke-coverage-guard"
  Markers = @("Provider adapter smoke coverage guard", "Provider adapter smoke coverage guard verifies provider adapter batch has targeted smoke scripts and all-smoke registration without removing previous coverage", "Provider adapter smoke coverage guard keeps smoke scanning scoped to provider adapter batch-owned files to avoid old helper false positives", "Provider adapter smoke coverage guard preserves checkpoint smoke coverage", "Denied provider adapter smoke coverage regression paths remain blocked", "Provider adapter smoke coverage checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
