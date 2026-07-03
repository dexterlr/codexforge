param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2302 Provider Gateway Fallback Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-gateway-fallback-boundary-preview.ps1"
  Domain = "provider-gateway-fallback-boundary-preview"
  Route = "provider-gateway-fallback-boundary-preview"
  CommandLabel = "Go to Provider Gateway Fallback Boundary Preview"
  RouteHref = "/provider-gateway-fallback-boundary-preview"
  Markers = @("Provider gateway fallback boundary preview", "Provider gateway fallback boundary preview defines future fallback routing requirements without routing real prompts or calling fallback providers", "Provider gateway fallback boundary preview keeps fallback selection backend-owned and approval-gated", "Provider gateway fallback boundary preview blocks live fallback execution", "Denied provider fallback boundary paths remain blocked", "Provider gateway fallback boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
