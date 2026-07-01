param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1928 First Video Creation Domain Boundary Candidate"
  ScriptFile = "smoke-codexforge-first-video-creation-domain-boundary-candidate.ps1"
  Domain = "src\lib\codexforge\first-video-creation-domain-boundary-candidate"
  Route = "src\app\first-video-creation-domain-boundary-candidate"
  CommandLabel = "Go to First Video Creation Domain Boundary Candidate"
  RouteHref = "/first-video-creation-domain-boundary-candidate"
  Markers = @("First video creation domain boundary candidate", "First video creation domain boundary candidate does not enable rendering export upload download provider calls model calls connector calls image generation video generation voice generation publishing scheduling file writes asset persistence prompt persistence job persistence or approval persistence from the UI", "First video creation domain boundary candidate requires explicit operator approval", "Candidate combines workspace intake project brief audience and goal format boundary safety and rights asset planning script planning storyboard planning voiceover planning caption planning render job blocked export blocked cockpit summary and denied paths", "Denied first video creation domain paths remain blocked", "First video creation domain boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
