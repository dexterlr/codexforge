param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2193 Audio Voiceover Planner Mock"
  ScriptFile = "smoke-codexforge-audio-voiceover-planner-mock.ps1"
  Domain = "src\lib\codexforge\audio-voiceover-planner-mock"
  Route = "src\app\audio-voiceover-planner-mock"
  CommandLabel = "Go to Audio Voiceover Planner Mock"
  RouteHref = "/audio-voiceover-planner-mock"
  Markers = @("Audio voiceover planner mock", "Audio voiceover planner mock uses local React state only and does not upload audio generate voice clone voice transcribe audio or persist audio state", "Audio voiceover planner mock includes voice tone pacing music bed sound effects and consent requirement rows", "Audio voiceover planner mock makes audio storage and consent backend prerequisites visible", "Denied audio generation and persistence paths remain blocked", "Audio voiceover planner mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
