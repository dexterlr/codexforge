param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2264 Cockpit Backend Readiness Rail"
  ScriptFile = "smoke-codexforge-cockpit-backend-readiness-rail.ps1"
  Domain = "cockpit-backend-readiness-rail"
  Route = "cockpit-backend-readiness-rail"
  CommandLabel = "Go to Cockpit Backend Readiness Rail"
  RouteHref = "/cockpit-backend-readiness-rail"
  Markers = @("Cockpit Backend Readiness Rail", "request boundary review-only", "audit envelope required", "permission envelope required", "secret handling server-only")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
