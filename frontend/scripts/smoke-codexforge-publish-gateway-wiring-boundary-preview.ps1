param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2260 Publish Gateway Wiring Boundary Preview"
  ScriptFile = "smoke-codexforge-publish-gateway-wiring-boundary-preview.ps1"
  Domain = "publish-gateway-wiring-boundary-preview"
  Route = "publish-gateway-wiring-boundary-preview"
  CommandLabel = "Go to Publish Gateway Wiring Boundary Preview"
  RouteHref = "/publish-gateway-wiring-boundary-preview"
  Markers = @("Publish Gateway Wiring Boundary", "publish gateway boundary", "No publish", "No schedule", "No token storage")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
