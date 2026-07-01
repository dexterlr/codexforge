param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1944 First Script And Storyboard Workspace Candidate"
  ScriptFile = "smoke-codexforge-first-script-and-storyboard-workspace-candidate.ps1"
  Domain = "src\lib\codexforge\first-script-and-storyboard-workspace-candidate"
  Route = "src\app\first-script-and-storyboard-workspace-candidate"
  CommandLabel = "Go to First Script And Storyboard Workspace Candidate"
  RouteHref = "/first-script-and-storyboard-workspace-candidate"
  Markers = @("First script and storyboard workspace candidate", "First script and storyboard workspace candidate does not enable final script generation rendering export upload download provider calls model calls connector calls image generation video generation voice generation publishing scheduling file writes script persistence storyboard persistence asset persistence prompt persistence job persistence or approval persistence from the UI", "First script and storyboard workspace candidate requires explicit operator approval", "Candidate combines script brief intake hook and opening beat scene outline storyboard card grid shot intent visual references b-roll and asset notes captions review comments brand and rights model generation blocked storyboard export blocked cockpit summary and denied paths", "Denied first script and storyboard workspace paths remain blocked", "First script and storyboard workspace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

