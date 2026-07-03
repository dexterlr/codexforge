param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2343 Provider Adapter Backend Readiness Summary"
  ScriptFile = "smoke-codexforge-provider-adapter-backend-readiness-summary.ps1"
  Domain = "provider-adapter-backend-readiness-summary"
  Route = "provider-adapter-backend-readiness-summary"
  CommandLabel = "Go to Provider Adapter Backend Readiness Summary"
  RouteHref = "/provider-adapter-backend-readiness-summary"
  Markers = @("Provider adapter backend readiness summary", "Provider adapter backend readiness summary lists backend prerequisites for future adapter implementation without creating services APIs clients or route handlers", "Provider adapter backend readiness summary requires dry run harness approval enforcement audit persistence redaction retry fallback timeout and observability", "Provider adapter backend readiness summary keeps implementation deferred", "Denied provider adapter backend readiness paths remain blocked", "Provider adapter backend readiness checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
