param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2298 Provider Gateway Token Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-gateway-token-boundary-preview.ps1"
  Domain = "provider-gateway-token-boundary-preview"
  Route = "provider-gateway-token-boundary-preview"
  CommandLabel = "Go to Provider Gateway Token Boundary Preview"
  RouteHref = "/provider-gateway-token-boundary-preview"
  Markers = @("Provider gateway token boundary preview", "Provider gateway token boundary preview defines future token handling requirements without storing tokens authorizing accounts or calling providers", "Provider gateway token boundary preview keeps tokens backend-owned and never available to frontend code", "Provider gateway token boundary preview blocks token storage", "Denied provider token boundary paths remain blocked", "Provider gateway token boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
