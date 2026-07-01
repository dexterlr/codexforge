param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1963 Narration Brief Preview"
  ScriptFile = "smoke-codexforge-narration-brief-preview.ps1"
  Domain = "src\lib\codexforge\narration-brief-preview"
  Route = "src\app\narration-brief-preview"
  CommandLabel = "Go to Narration Brief Preview"
  RouteHref = "/narration-brief-preview"
  Markers = @("Narration brief preview", "Narration brief preview does not synthesize voice send prompts call models persist voice scripts or create audio files from the UI", "Narration brief preview requires deterministic synthetic narration planning rows only", "Narration brief preview shows simulated narrator role simulated message goal simulated tone note simulated duration target simulated no voice generation state and denied frontend persistence", "Denied narration brief paths remain blocked", "Narration brief checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

