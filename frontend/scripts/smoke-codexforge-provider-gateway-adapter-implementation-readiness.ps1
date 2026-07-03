param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2310 Provider Gateway Adapter Implementation Readiness"
  ScriptFile = "smoke-codexforge-provider-gateway-adapter-implementation-readiness.ps1"
  Domain = "provider-gateway-adapter-implementation-readiness"
  Route = "provider-gateway-adapter-implementation-readiness"
  CommandLabel = "Go to Provider Gateway Adapter Implementation Readiness"
  RouteHref = "/provider-gateway-adapter-implementation-readiness"
  Markers = @("Provider gateway adapter implementation readiness", "Provider gateway adapter implementation readiness lists adapter implementation prerequisites without implementing adapters clients SDKs or provider calls", "Provider gateway adapter implementation readiness keeps adapter creation blocked until future backend-owned batch", "Provider gateway adapter implementation readiness requires explicit approval and audit", "Denied provider adapter readiness paths remain blocked", "Provider gateway adapter readiness checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
