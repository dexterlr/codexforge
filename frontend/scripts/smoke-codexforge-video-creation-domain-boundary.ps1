param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1914 Video Creation Domain Boundary"
  ScriptFile = "smoke-codexforge-video-creation-domain-boundary.ps1"
  Domain = "src\lib\codexforge\video-creation-domain-boundary"
  Route = "src\app\video-creation-domain-boundary"
  CommandLabel = "Go to Video Creation Domain Boundary"
  RouteHref = "/video-creation-domain-boundary"
  Markers = @("Video creation domain boundary", "Video creation domain boundary does not render videos export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals or write files from the UI", "Video creation domain boundary requires explicit operator approval", "Video creation domain boundary prepares deterministic synthetic video creation planning workflows without frontend rendering export provider calls asset persistence or publishing", "Denied video creation domain paths remain blocked", "Video creation domain boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
