param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2300 Provider Gateway Retry Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-gateway-retry-boundary-preview.ps1"
  Domain = "provider-gateway-retry-boundary-preview"
  Route = "provider-gateway-retry-boundary-preview"
  CommandLabel = "Go to Provider Gateway Retry Boundary Preview"
  RouteHref = "/provider-gateway-retry-boundary-preview"
  Markers = @("Provider gateway retry boundary preview", "Provider gateway retry boundary preview defines future retry requirements without retrying provider calls or storing retry state", "Provider gateway retry boundary preview keeps retries backend-owned and auditable", "Provider gateway retry boundary preview blocks live retry execution", "Denied provider retry boundary paths remain blocked", "Provider gateway retry boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
