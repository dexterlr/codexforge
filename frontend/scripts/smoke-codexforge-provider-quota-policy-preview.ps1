param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2051 Provider Quota Policy Preview"
  ScriptFile = "smoke-codexforge-provider-quota-policy-preview.ps1"
  Domain = "src\lib\codexforge\provider-quota-policy-preview"
  Route = "src\app\provider-quota-policy-preview"
  CommandLabel = "Go to Provider Quota Policy Preview"
  RouteHref = "/provider-quota-policy-preview"
  Markers = @("Provider quota policy preview", "Provider quota policy preview does not spend credits call providers persist usage or mutate billing state from the UI", "Provider quota policy preview requires backend-owned quota ledger cost controls budget approval and audit trail", "Provider quota policy preview shows simulated quota bucket simulated cost guard simulated approval threshold simulated usage summary simulated denied frontend billing mutation", "Denied provider quota policy paths remain blocked", "Provider quota policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

