param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1952 Music And Audio Asset Note Preview"
  ScriptFile = "smoke-codexforge-music-and-audio-asset-note-preview.ps1"
  Domain = "src\lib\codexforge\music-and-audio-asset-note-preview"
  Route = "src\app\music-and-audio-asset-note-preview"
  CommandLabel = "Go to Music And Audio Asset Note Preview"
  RouteHref = "/music-and-audio-asset-note-preview"
  Markers = @("Music and audio asset note preview", "Music and audio asset note preview does not download music synthesize voice upload audio store media or clear music rights from the UI", "Music and audio asset note preview requires backend-owned rights review asset storage and approval", "Music and audio asset note preview shows simulated music mood simulated audio cue simulated rights note simulated consent note simulated audio persistence blocked state", "Denied music and audio asset note paths remain blocked", "Music and audio asset note checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

