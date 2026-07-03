param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2250 First Backend Wiring Boundary Map"
  ScriptFile = "smoke-codexforge-first-backend-wiring-boundary-map.ps1"
  Domain = "first-backend-wiring-boundary-map"
  Route = "first-backend-wiring-boundary-map"
  CommandLabel = "Go to First Backend Wiring Boundary Map"
  RouteHref = "/first-backend-wiring-boundary-map"
  Markers = @("Backend Wiring Boundary Map", "First Backend Wiring Boundary map keeps every backend seam review-only", "Backend-owned services remain required before any execution path exists", "No live backend execution", "Audit trail required")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
