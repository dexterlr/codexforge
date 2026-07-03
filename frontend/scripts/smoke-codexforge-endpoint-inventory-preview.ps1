param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2266 Endpoint Inventory Preview"
  ScriptFile = "smoke-codexforge-endpoint-inventory-preview.ps1"
  Domain = "endpoint-inventory-preview"
  Route = "endpoint-inventory-preview"
  CommandLabel = "Go to Endpoint Inventory Preview"
  RouteHref = "/endpoint-inventory-preview"
  Markers = @("Endpoint Inventory Preview", "endpoint inventory preview", "No API creation from frontend", "No service creation", "No live backend execution")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
