param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1976 First Voiceover And Caption Planning Workspace Candidate"
  ScriptFile = "smoke-codexforge-first-voiceover-and-caption-planning-workspace-candidate.ps1"
  Domain = "src\lib\codexforge\first-voiceover-and-caption-planning-workspace-candidate"
  Route = "src\app\first-voiceover-and-caption-planning-workspace-candidate"
  CommandLabel = "Go to First Voiceover And Caption Planning Workspace Candidate"
  RouteHref = "/first-voiceover-and-caption-planning-workspace-candidate"
  Markers = @("First voiceover and caption planning workspace candidate", "First voiceover and caption planning workspace candidate does not enable voice generation voice cloning audio synthesis transcription caption export subtitle generation upload download rendering export provider calls model calls connector calls image generation video generation publishing scheduling file writes voice persistence caption persistence transcript persistence audio persistence rights persistence prompt persistence job persistence or approval persistence from the UI", "First voiceover and caption planning workspace candidate requires explicit operator approval", "Candidate combines narration brief voice tone and pace consent and rights audio cue planning caption style subtitle timing lower thirds accessibility notes transcript review blockers voice generation blocked caption export blocked cockpit summary and denied paths", "Denied first voiceover and caption planning workspace paths remain blocked", "First voiceover and caption planning workspace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

