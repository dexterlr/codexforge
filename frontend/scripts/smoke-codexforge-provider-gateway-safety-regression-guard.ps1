param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2304 Provider Gateway Safety Regression Guard"
  ScriptFile = "smoke-codexforge-provider-gateway-safety-regression-guard.ps1"
  Domain = "provider-gateway-safety-regression-guard"
  Route = "provider-gateway-safety-regression-guard"
  CommandLabel = "Go to Provider Gateway Safety Regression Guard"
  RouteHref = "/provider-gateway-safety-regression-guard"
  Markers = @("Provider gateway safety regression guard", "Provider gateway safety regression guard verifies provider gateway wiring remains review-only with no provider calls no model calls no prompt sending no credential storage no token storage no streaming and no hidden execution", "Provider gateway safety regression guard preserves backend wiring and Jarvis cockpit safety", "Provider gateway safety regression guard blocks hidden provider execution affordances", "Denied provider gateway safety regression paths remain blocked", "Provider gateway safety regression checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
