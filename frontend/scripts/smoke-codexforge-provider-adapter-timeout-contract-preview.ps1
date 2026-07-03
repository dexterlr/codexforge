param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2326 Provider Adapter Timeout Contract Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-timeout-contract-preview.ps1"
  Domain = "provider-adapter-timeout-contract-preview"
  Route = "provider-adapter-timeout-contract-preview"
  CommandLabel = "Go to Provider Adapter Timeout Contract Preview"
  RouteHref = "/provider-adapter-timeout-contract-preview"
  Markers = @("Provider adapter timeout contract preview", "Provider adapter timeout contract preview defines future timeout semantics without calling providers or scheduling live work", "Provider adapter timeout contract preview keeps timeout enforcement backend-owned and deterministic", "Provider adapter timeout contract preview blocks live timeout execution", "Denied provider adapter timeout paths remain blocked", "Provider adapter timeout checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
