param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2276 Backend Wiring Navigation Regression Guard"
  ScriptFile = "smoke-codexforge-backend-wiring-navigation-regression-guard.ps1"
  Domain = "backend-wiring-navigation-regression-guard"
  Route = "backend-wiring-navigation-regression-guard"
  CommandLabel = "Go to Backend Wiring Navigation Regression Guard"
  RouteHref = "/backend-wiring-navigation-regression-guard"
  Markers = @("Backend wiring navigation regression guard", "valid navigation group values", "valid safetyPosture values", "commandDeckRole workspace", "Review-only backend wiring boundary")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
