param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2305 Provider Gateway Navigation Regression Guard"
  ScriptFile = "smoke-codexforge-provider-gateway-navigation-regression-guard.ps1"
  Domain = "provider-gateway-navigation-regression-guard"
  Route = "provider-gateway-navigation-regression-guard"
  CommandLabel = "Go to Provider Gateway Navigation Regression Guard"
  RouteHref = "/provider-gateway-navigation-regression-guard"
  Markers = @("Provider gateway navigation regression guard", "Provider gateway navigation regression guard verifies provider gateway routes are registered without duplicate hrefs invalid route hrefs invalid navigation groups invalid safety posture values invalid commandDeckRole values or broken cockpit links", "Provider gateway navigation regression guard preserves backend wiring and Jarvis cockpit navigation coverage", "Provider gateway navigation regression guard keeps provider diagnostics review-only", "Denied provider gateway navigation regression paths remain blocked", "Provider gateway navigation regression checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
