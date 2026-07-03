param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2277 Backend Wiring Smoke Coverage Guard"
  ScriptFile = "smoke-codexforge-backend-wiring-smoke-coverage-guard.ps1"
  Domain = "backend-wiring-smoke-coverage-guard"
  Route = "backend-wiring-smoke-coverage-guard"
  CommandLabel = "Go to Backend Wiring Smoke Coverage Guard"
  RouteHref = "/backend-wiring-smoke-coverage-guard"
  Markers = @("Backend wiring smoke coverage guard", "smoke scripts registered after phase 2249", "No live backend execution", "No API creation from frontend", "Backend-owned services remain required")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
