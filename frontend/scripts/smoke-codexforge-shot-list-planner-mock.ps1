param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2191 Shot List Planner Mock"
  ScriptFile = "smoke-codexforge-shot-list-planner-mock.ps1"
  Domain = "src\lib\codexforge\shot-list-planner-mock"
  Route = "src\app\shot-list-planner-mock"
  CommandLabel = "Go to Shot List Planner Mock"
  RouteHref = "/shot-list-planner-mock"
  Markers = @("Shot list planner mock", "Shot list planner mock uses local React state only and does not create jobs render shots upload media or persist shot lists", "Shot list planner mock includes shot type framing movement asset need duration and dependency state", "Shot list planner mock updates local readiness counts only", "Denied shot planning persistence paths remain blocked", "Shot list planner mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
