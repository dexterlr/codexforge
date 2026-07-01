param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1968 Subtitle Timing Plan Preview"
  ScriptFile = "smoke-codexforge-subtitle-timing-plan-preview.ps1"
  Domain = "src\lib\codexforge\subtitle-timing-plan-preview"
  Route = "src\app\subtitle-timing-plan-preview"
  CommandLabel = "Go to Subtitle Timing Plan Preview"
  RouteHref = "/subtitle-timing-plan-preview"
  Markers = @("Subtitle timing plan preview", "Subtitle timing plan preview does not transcribe audio align subtitles write srt files export vtt files or persist timing from the UI", "Subtitle timing plan preview requires backend-owned caption timing workflow", "Subtitle timing plan preview shows simulated subtitle segment simulated timestamp note simulated reading speed note simulated sync risk simulated denied frontend export", "Denied subtitle timing plan paths remain blocked", "Subtitle timing plan checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

