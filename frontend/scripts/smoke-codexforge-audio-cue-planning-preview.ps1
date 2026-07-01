param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1966 Audio Cue Planning Preview"
  ScriptFile = "smoke-codexforge-audio-cue-planning-preview.ps1"
  Domain = "src\lib\codexforge\audio-cue-planning-preview"
  Route = "src\app\audio-cue-planning-preview"
  CommandLabel = "Go to Audio Cue Planning Preview"
  RouteHref = "/audio-cue-planning-preview"
  Markers = @("Audio cue planning preview", "Audio cue planning preview does not upload audio download music synthesize sounds store media or clear music rights from the UI", "Audio cue planning preview requires backend-owned audio storage rights review and approval", "Audio cue planning preview shows simulated intro cue simulated transition cue simulated music mood simulated rights note simulated audio persistence blocked state", "Denied audio cue planning paths remain blocked", "Audio cue planning checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

