param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2280 Controlled Backend Wiring Boundary Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-backend-wiring-boundary-release-candidate.ps1"
  Domain = "controlled-backend-wiring-boundary-release-candidate"
  Route = "controlled-backend-wiring-boundary-release-candidate"
  CommandLabel = "Go to Controlled Backend Wiring Boundary Release Candidate"
  RouteHref = "/controlled-backend-wiring-boundary-release-candidate"
  Markers = @("Controlled Backend Wiring Boundary Release Candidate", "First Backend Wiring Boundary", "No live backend execution", "Backend-owned services remain required", "Explicit operator approval required")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
