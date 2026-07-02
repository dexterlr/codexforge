param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2215 UX Checkpoint Completion Guard"
  ScriptFile = "smoke-codexforge-ux-checkpoint-completion-guard.ps1"
  Domain = "src\lib\codexforge\ux-checkpoint-completion-guard"
  Route = "src\app\ux-checkpoint-completion-guard"
  CommandLabel = "Go to UX Checkpoint Completion Guard"
  RouteHref = "/ux-checkpoint-completion-guard"
  Markers = @("UX checkpoint completion guard", "UX checkpoint completion guard updates checkpoint docs through phase 2217 and marks interactive UX complete without claiming backend wiring exists", "UX checkpoint completion guard records next likely batch as First Backend Wiring Boundary Mega Batch v1", "UX checkpoint completion guard states backend contracts are foundation complete and interactive UX is local-state only", "Denied UX checkpoint regression paths remain blocked", "UX checkpoint completion guard checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
