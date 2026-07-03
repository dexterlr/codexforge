param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2278 Backend Wiring Checkpoint Completion Guard"
  ScriptFile = "smoke-codexforge-backend-wiring-checkpoint-completion-guard.ps1"
  Domain = "backend-wiring-checkpoint-completion-guard"
  Route = "backend-wiring-checkpoint-completion-guard"
  CommandLabel = "Go to Backend Wiring Checkpoint Completion Guard"
  RouteHref = "/backend-wiring-checkpoint-completion-guard"
  Markers = @("Backend wiring checkpoint completion guard", "highest phase 2281", "Controlled First Backend Wiring Boundary Completion Candidate", "No live backend execution", "next batch: 2282-2313 - Provider Gateway Wiring Mega Batch v1")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
