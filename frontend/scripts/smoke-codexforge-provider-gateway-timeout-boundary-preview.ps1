param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2301 Provider Gateway Timeout Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-gateway-timeout-boundary-preview.ps1"
  Domain = "provider-gateway-timeout-boundary-preview"
  Route = "provider-gateway-timeout-boundary-preview"
  CommandLabel = "Go to Provider Gateway Timeout Boundary Preview"
  RouteHref = "/provider-gateway-timeout-boundary-preview"
  Markers = @("Provider gateway timeout boundary preview", "Provider gateway timeout boundary preview defines future timeout requirements without calling providers or scheduling timers for live work", "Provider gateway timeout boundary preview keeps timeouts backend-owned and deterministic", "Provider gateway timeout boundary preview blocks live timeout handling", "Denied provider timeout boundary paths remain blocked", "Provider gateway timeout boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
