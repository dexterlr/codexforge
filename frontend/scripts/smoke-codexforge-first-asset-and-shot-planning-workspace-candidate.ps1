param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1960 First Asset And Shot Planning Workspace Candidate"
  ScriptFile = "smoke-codexforge-first-asset-and-shot-planning-workspace-candidate.ps1"
  Domain = "src\lib\codexforge\first-asset-and-shot-planning-workspace-candidate"
  Route = "src\app\first-asset-and-shot-planning-workspace-candidate"
  CommandLabel = "Go to First Asset And Shot Planning Workspace Candidate"
  RouteHref = "/first-asset-and-shot-planning-workspace-candidate"
  Markers = @("First asset and shot planning workspace candidate", "First asset and shot planning workspace candidate does not enable upload download media storage rendering export provider calls model calls connector calls image generation video generation voice generation publishing scheduling file writes script persistence storyboard persistence asset persistence rights persistence prompt persistence job persistence or approval persistence from the UI", "First asset and shot planning workspace candidate requires explicit operator approval", "Candidate combines shot list scene asset map b-roll requirements product shot requirements visual references music and audio notes brand asset checklist rights and source status missing blockers handoff packet upload blocked download blocked cockpit summary and denied paths", "Denied first asset and shot planning workspace paths remain blocked", "First asset and shot planning workspace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

