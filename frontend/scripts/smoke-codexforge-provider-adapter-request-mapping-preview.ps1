param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2317 Provider Adapter Request Mapping Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-request-mapping-preview.ps1"
  Domain = "provider-adapter-request-mapping-preview"
  Route = "provider-adapter-request-mapping-preview"
  CommandLabel = "Go to Provider Adapter Request Mapping Preview"
  RouteHref = "/provider-adapter-request-mapping-preview"
  Markers = @("Provider adapter request mapping preview", "Provider adapter request mapping preview defines synthetic mapping from provider request envelope to adapter input without sending prompts", "Provider adapter request mapping preview does not transmit prompt payloads call providers or persist requests", "Provider adapter request mapping preview keeps request transformation backend-owned", "Denied provider adapter request mapping paths remain blocked", "Provider adapter request mapping checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
