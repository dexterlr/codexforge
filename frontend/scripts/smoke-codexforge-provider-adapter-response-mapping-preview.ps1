param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2318 Provider Adapter Response Mapping Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-response-mapping-preview.ps1"
  Domain = "provider-adapter-response-mapping-preview"
  Route = "provider-adapter-response-mapping-preview"
  CommandLabel = "Go to Provider Adapter Response Mapping Preview"
  RouteHref = "/provider-adapter-response-mapping-preview"
  Markers = @("Provider adapter response mapping preview", "Provider adapter response mapping preview defines synthetic mapping from adapter output to provider response envelope without receiving model outputs", "Provider adapter response mapping preview does not stream tokens persist outputs or call providers", "Provider adapter response mapping preview keeps response capture backend-owned", "Denied provider adapter response mapping paths remain blocked", "Provider adapter response mapping checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
