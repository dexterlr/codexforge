param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2265 Disabled Backend Adapter Layer Preview"
  ScriptFile = "smoke-codexforge-disabled-backend-adapter-layer-preview.ps1"
  Domain = "disabled-backend-adapter-layer-preview"
  Route = "disabled-backend-adapter-layer-preview"
  CommandLabel = "Go to Disabled Backend Adapter Layer Preview"
  RouteHref = "/disabled-backend-adapter-layer-preview"
  Markers = @("Disabled Backend Adapter Layer", "disabled backend adapter layer", "No live backend execution", "No queue dispatch", "No worker dispatch")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
