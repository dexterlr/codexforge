param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2281 Controlled First Backend Wiring Boundary Completion Candidate"
  ScriptFile = "smoke-codexforge-controlled-first-backend-wiring-boundary-completion-candidate.ps1"
  Domain = "controlled-first-backend-wiring-boundary-completion-candidate"
  Route = "controlled-first-backend-wiring-boundary-completion-candidate"
  CommandLabel = "Go to Controlled First Backend Wiring Boundary Completion Candidate"
  RouteHref = "/controlled-first-backend-wiring-boundary-completion-candidate"
  Markers = @("Controlled First Backend Wiring Boundary Completion Candidate", "First Backend Wiring Boundary", "No live backend execution exists yet", "frontend remains review-only/local-state-only", "next batch: 2282-2313 - Provider Gateway Wiring Mega Batch v1")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
