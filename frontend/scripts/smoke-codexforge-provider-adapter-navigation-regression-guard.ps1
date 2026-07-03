param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2338 Provider Adapter Navigation Regression Guard"
  ScriptFile = "smoke-codexforge-provider-adapter-navigation-regression-guard.ps1"
  Domain = "provider-adapter-navigation-regression-guard"
  Route = "provider-adapter-navigation-regression-guard"
  CommandLabel = "Go to Provider Adapter Navigation Regression Guard"
  RouteHref = "/provider-adapter-navigation-regression-guard"
  Markers = @("Provider adapter navigation regression guard", "Provider adapter navigation regression guard verifies provider adapter routes are registered without duplicate hrefs invalid route hrefs invalid navigation groups invalid safety posture values invalid commandDeckRole values or broken cockpit links", "Provider adapter navigation regression guard preserves provider gateway backend wiring and Jarvis navigation coverage", "Provider adapter navigation regression guard keeps adapter diagnostics review-only", "Denied provider adapter navigation regression paths remain blocked", "Provider adapter navigation regression checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
