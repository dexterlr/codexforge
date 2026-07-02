param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2024 First Controlled Video Creation Workspace Candidate"
  ScriptFile = "smoke-codexforge-first-controlled-video-creation-workspace-candidate.ps1"
  Domain = "src\lib\codexforge\first-controlled-video-creation-workspace-candidate"
  Route = "src\app\first-controlled-video-creation-workspace-candidate"
  CommandLabel = "Go to First Controlled Video Creation Workspace Candidate"
  RouteHref = "/first-controlled-video-creation-workspace-candidate"
  Markers = @("First controlled video creation workspace candidate", "First controlled video creation workspace candidate does not enable generation prompt sending provider calls model calls connector calls rendering queue creation worker dispatch artifact creation export download upload publishing scheduling file writes script persistence storyboard persistence asset persistence audio persistence caption persistence transcript persistence rights persistence prompt persistence job persistence render persistence export persistence revision persistence publish persistence or approval persistence from the UI", "First controlled video creation workspace candidate requires explicit operator approval", "Denied first controlled video creation workspace paths remain blocked", "First controlled video creation workspace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

