param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1983 Audio Readiness Gate Preview"
  ScriptFile = "smoke-codexforge-audio-readiness-gate-preview.ps1"
  Domain = "src\lib\codexforge\audio-readiness-gate-preview"
  Route = "src\app\audio-readiness-gate-preview"
  CommandLabel = "Go to Audio Readiness Gate Preview"
  RouteHref = "/audio-readiness-gate-preview"
  Markers = @("Audio readiness gate preview", "Audio readiness gate preview does not synthesize voice clone voice upload audio download audio store media or clear music rights from the UI", "Audio readiness gate preview requires backend-owned audio storage consent review rights review and approval", "Audio readiness gate preview shows simulated narration ready simulated music cue ready simulated consent ready simulated rights ready simulated audio persistence blocked state", "Denied audio readiness gate paths remain blocked", "Audio readiness gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

