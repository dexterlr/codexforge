param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2050 Provider Rate Limit Policy Preview"
  ScriptFile = "smoke-codexforge-provider-rate-limit-policy-preview.ps1"
  Domain = "src\lib\codexforge\provider-rate-limit-policy-preview"
  Route = "src\app\provider-rate-limit-policy-preview"
  CommandLabel = "Go to Provider Rate Limit Policy Preview"
  RouteHref = "/provider-rate-limit-policy-preview"
  Markers = @("Provider rate limit policy preview", "Provider rate limit policy preview does not call providers consume quota create jobs or throttle real requests from the UI", "Provider rate limit policy preview requires backend-owned quota ledger rate limiter retry policy and audit trail", "Provider rate limit policy preview shows simulated rate limit simulated retry window simulated provider budget simulated operator threshold simulated denied frontend quota mutation", "Denied provider rate limit policy paths remain blocked", "Provider rate limit policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

