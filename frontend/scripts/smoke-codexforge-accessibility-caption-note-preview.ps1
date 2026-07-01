param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1970 Accessibility Caption Note Preview"
  ScriptFile = "smoke-codexforge-accessibility-caption-note-preview.ps1"
  Domain = "src\lib\codexforge\accessibility-caption-note-preview"
  Route = "src\app\accessibility-caption-note-preview"
  CommandLabel = "Go to Accessibility Caption Note Preview"
  RouteHref = "/accessibility-caption-note-preview"
  Markers = @("Accessibility caption note preview", "Accessibility caption note preview does not transcribe audio generate captions persist accessibility files or export subtitles from the UI", "Accessibility caption note preview requires backend-owned accessibility review and caption workflow", "Accessibility caption note preview shows simulated speaker label need simulated sound effect label simulated contrast note simulated reading speed note simulated approval requirement", "Denied accessibility caption note paths remain blocked", "Accessibility caption note checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

