param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1964 Voice Tone And Pace Preview"
  ScriptFile = "smoke-codexforge-voice-tone-and-pace-preview.ps1"
  Domain = "src\lib\codexforge\voice-tone-and-pace-preview"
  Route = "src\app\voice-tone-and-pace-preview"
  CommandLabel = "Go to Voice Tone And Pace Preview"
  RouteHref = "/voice-tone-and-pace-preview"
  Markers = @("Voice tone and pace preview", "Voice tone and pace preview does not clone voices synthesize audio call voice providers store voice profiles or export audio from the UI", "Voice tone and pace preview requires deterministic synthetic voice planning only", "Voice tone and pace preview shows simulated voice tone simulated read pace simulated emphasis note simulated pause note simulated backend voice workflow prerequisite", "Denied voice tone and pace paths remain blocked", "Voice tone and pace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

