param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2325 Provider Adapter Retry Contract Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-retry-contract-preview.ps1"
  Domain = "provider-adapter-retry-contract-preview"
  Route = "provider-adapter-retry-contract-preview"
  CommandLabel = "Go to Provider Adapter Retry Contract Preview"
  RouteHref = "/provider-adapter-retry-contract-preview"
  Markers = @("Provider adapter retry contract preview", "Provider adapter retry contract preview defines future retry semantics without retrying provider calls or storing retry state", "Provider adapter retry contract preview keeps retries backend-owned and auditable", "Provider adapter retry contract preview blocks live retry execution", "Denied provider adapter retry paths remain blocked", "Provider adapter retry checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
