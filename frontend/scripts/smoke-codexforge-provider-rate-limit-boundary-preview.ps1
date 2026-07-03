param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2290 Provider Rate Limit Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-rate-limit-boundary-preview.ps1"
  Domain = "provider-rate-limit-boundary-preview"
  Route = "provider-rate-limit-boundary-preview"
  CommandLabel = "Go to Provider Rate Limit Boundary Preview"
  RouteHref = "/provider-rate-limit-boundary-preview"
  Markers = @("Provider rate limit boundary preview", "Provider rate limit boundary preview defines future rate limit expectations without storing counters or sending traffic", "Provider rate limit boundary preview keeps rate limiting backend-owned and auditable", "Provider rate limit boundary preview blocks live traffic by default", "Denied provider rate limit paths remain blocked", "Provider rate limit checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
