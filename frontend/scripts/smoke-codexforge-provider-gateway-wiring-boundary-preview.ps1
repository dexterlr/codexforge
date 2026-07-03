param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2254 Provider Gateway Wiring Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-gateway-wiring-boundary-preview.ps1"
  Domain = "provider-gateway-wiring-boundary-preview"
  Route = "provider-gateway-wiring-boundary-preview"
  CommandLabel = "Go to Provider Gateway Wiring Boundary Preview"
  RouteHref = "/provider-gateway-wiring-boundary-preview"
  Markers = @("Provider Gateway Wiring Boundary", "provider gateway boundary", "No provider calls", "No model calls", "next batch: 2282-2313 - Provider Gateway Wiring Mega Batch v1")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params
