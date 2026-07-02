param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2225 Asset Audio Status Matrix Preview"
  ScriptFile = "smoke-codexforge-asset-audio-status-matrix-preview.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Asset Audio Status Matrix Preview"
  RouteHref = "/asset-audio-status-matrix-preview"
  Markers = @("Asset audio status matrix preview", "Asset audio status matrix preview adds a premium matrix for asset and audio readiness storage scan rights consent transcript and caption prerequisites", "Asset audio status matrix preview does not upload assets upload audio store media scan files transcribe audio generate voice persist state or call services", "Asset audio status matrix preview keeps storage and consent backend prerequisites visible", "Denied asset audio matrix execution paths remain blocked", "Asset audio status matrix checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
