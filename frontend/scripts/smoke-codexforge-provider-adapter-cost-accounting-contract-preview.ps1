param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2334 Provider Adapter Cost Accounting Contract Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-cost-accounting-contract-preview.ps1"
  Domain = "provider-adapter-cost-accounting-contract-preview"
  Route = "provider-adapter-cost-accounting-contract-preview"
  CommandLabel = "Go to Provider Adapter Cost Accounting Contract Preview"
  RouteHref = "/provider-adapter-cost-accounting-contract-preview"
  Markers = @("Provider adapter cost accounting contract preview", "Provider adapter cost accounting contract preview defines future cost accounting metadata without calling billing endpoints or providers", "Provider adapter cost accounting contract preview keeps spend controls backend-owned", "Provider adapter cost accounting contract preview blocks paid execution", "Denied provider adapter cost accounting paths remain blocked", "Provider adapter cost accounting checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
