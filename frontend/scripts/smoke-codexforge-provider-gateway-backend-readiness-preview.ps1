param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2309 Provider Gateway Backend Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-gateway-backend-readiness-preview.ps1"
  Domain = "provider-gateway-backend-readiness-preview"
  Route = "provider-gateway-backend-readiness-preview"
  CommandLabel = "Go to Provider Gateway Backend Readiness Preview"
  RouteHref = "/provider-gateway-backend-readiness-preview"
  Markers = @("Provider gateway backend readiness preview", "Provider gateway backend readiness preview lists backend prerequisites for future provider execution without creating APIs services SDK clients or route handlers", "Provider gateway backend readiness preview requires server-only credentials approval enforcement audit persistence retry fallback timeout and observability", "Provider gateway backend readiness preview keeps execution deferred", "Denied provider backend readiness paths remain blocked", "Provider gateway backend readiness checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
