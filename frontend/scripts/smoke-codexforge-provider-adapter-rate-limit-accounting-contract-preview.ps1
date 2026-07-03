param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2335 Provider Adapter Rate Limit Accounting Contract Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-rate-limit-accounting-contract-preview.ps1"
  Domain = "provider-adapter-rate-limit-accounting-contract-preview"
  Route = "provider-adapter-rate-limit-accounting-contract-preview"
  CommandLabel = "Go to Provider Adapter Rate Limit Accounting Contract Preview"
  RouteHref = "/provider-adapter-rate-limit-accounting-contract-preview"
  Markers = @("Provider adapter rate limit accounting contract preview", "Provider adapter rate limit accounting contract preview defines future rate limit accounting without storing counters or sending provider traffic", "Provider adapter rate limit accounting contract preview keeps rate limits backend-owned and auditable", "Provider adapter rate limit accounting contract preview blocks live traffic", "Denied provider adapter rate limit accounting paths remain blocked", "Provider adapter rate limit accounting checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
