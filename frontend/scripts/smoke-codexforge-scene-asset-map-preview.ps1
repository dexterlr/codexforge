param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1948 Scene Asset Map Preview"
  ScriptFile = "smoke-codexforge-scene-asset-map-preview.ps1"
  Domain = "src\lib\codexforge\scene-asset-map-preview"
  Route = "src\app\scene-asset-map-preview"
  CommandLabel = "Go to Scene Asset Map Preview"
  RouteHref = "/scene-asset-map-preview"
  Markers = @("Scene asset map preview", "Scene asset map preview does not upload assets store media persist maps or call asset providers from the UI", "Scene asset map preview requires backend-owned asset storage before persistence", "Scene asset map preview shows simulated scene id simulated asset need simulated source note simulated rights status simulated denied frontend persistence", "Denied scene asset map paths remain blocked", "Scene asset map checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

