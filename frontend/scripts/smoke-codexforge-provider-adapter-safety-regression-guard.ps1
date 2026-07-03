param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2337 Provider Adapter Safety Regression Guard"
  ScriptFile = "smoke-codexforge-provider-adapter-safety-regression-guard.ps1"
  Domain = "provider-adapter-safety-regression-guard"
  Route = "provider-adapter-safety-regression-guard"
  CommandLabel = "Go to Provider Adapter Safety Regression Guard"
  RouteHref = "/provider-adapter-safety-regression-guard"
  Markers = @("Provider adapter safety regression guard", "Provider adapter safety regression guard verifies provider backend adapter contracts remain review-only with no provider calls no model calls no prompt sending no credential storage no token storage no streaming no hidden execution and no SDK clients", "Provider adapter safety regression guard preserves provider gateway and backend wiring boundaries", "Provider adapter safety regression guard blocks hidden adapter execution affordances", "Denied provider adapter safety regression paths remain blocked", "Provider adapter safety regression checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
