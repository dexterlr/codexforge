param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1916 Video Project Brief Preview"
  ScriptFile = "smoke-codexforge-video-project-brief-preview.ps1"
  Domain = "src\lib\codexforge\video-project-brief-preview"
  Route = "src\app\video-project-brief-preview"
  CommandLabel = "Go to Video Project Brief Preview"
  RouteHref = "/video-project-brief-preview"
  Markers = @("Video project brief preview", "Video project brief preview does not generate final scripts call providers persist prompts or write documents from the UI", "Video project brief preview requires deterministic synthetic brief content only", "Video project brief preview shows simulated goal simulated topic simulated tone simulated key message simulated approval need and denied frontend persistence", "Denied video project brief paths remain blocked", "Video project brief checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
