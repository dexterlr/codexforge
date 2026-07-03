param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2275 Backend Wiring Safety Regression Guard"
  ScriptFile = "smoke-codexforge-backend-wiring-safety-regression-guard.ps1"
  Domain = "backend-wiring-safety-regression-guard"
  Route = "backend-wiring-safety-regression-guard"
  CommandLabel = "Go to Backend Wiring Safety Regression Guard"
  RouteHref = "/backend-wiring-safety-regression-guard"
  Markers = @("Backend wiring safety regression guard", "No live backend execution", "No frontend persistence", "No browser storage writes", "No command execution")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
