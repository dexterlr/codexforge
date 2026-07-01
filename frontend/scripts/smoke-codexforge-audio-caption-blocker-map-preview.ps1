param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1972 Audio Caption Blocker Map Preview"
  ScriptFile = "smoke-codexforge-audio-caption-blocker-map-preview.ps1"
  Domain = "src\lib\codexforge\audio-caption-blocker-map-preview"
  Route = "src\app\audio-caption-blocker-map-preview"
  CommandLabel = "Go to Audio Caption Blocker Map Preview"
  RouteHref = "/audio-caption-blocker-map-preview"
  Markers = @("Audio caption blocker map preview", "Audio caption blocker map preview does not create jobs dispatch workers persist queues bypass consent review or bypass rights review from the UI", "Audio caption blocker map preview requires deterministic synthetic blocker rows only", "Audio caption blocker map preview shows simulated missing consent simulated missing music rights simulated missing transcript simulated missing caption review simulated missing approval and backend prerequisite", "Denied audio caption blocker map paths remain blocked", "Audio caption blocker map checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

