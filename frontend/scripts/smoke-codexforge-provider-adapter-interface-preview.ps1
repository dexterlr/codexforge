param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2315 Provider Adapter Interface Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-interface-preview.ps1"
  Domain = "provider-adapter-interface-preview"
  Route = "provider-adapter-interface-preview"
  CommandLabel = "Go to Provider Adapter Interface Preview"
  RouteHref = "/provider-adapter-interface-preview"
  Markers = @("Provider adapter interface preview", "Provider adapter interface preview defines future backend adapter interface shape without importing SDKs or creating provider clients", "Provider adapter interface preview keeps adapter implementation deferred and review-only", "Provider adapter interface preview blocks live provider execution", "Denied provider adapter interface paths remain blocked", "Provider adapter interface checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
