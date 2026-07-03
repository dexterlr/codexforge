param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2299 Provider Gateway Streaming Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-gateway-streaming-boundary-preview.ps1"
  Domain = "provider-gateway-streaming-boundary-preview"
  Route = "provider-gateway-streaming-boundary-preview"
  CommandLabel = "Go to Provider Gateway Streaming Boundary Preview"
  RouteHref = "/provider-gateway-streaming-boundary-preview"
  Markers = @("Provider gateway streaming boundary preview", "Provider gateway streaming boundary preview defines future streaming response requirements without opening streams or receiving tokens", "Provider gateway streaming boundary preview keeps streaming backend-owned and approval-gated", "Provider gateway streaming boundary preview blocks live streams", "Denied provider streaming boundary paths remain blocked", "Provider gateway streaming boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
