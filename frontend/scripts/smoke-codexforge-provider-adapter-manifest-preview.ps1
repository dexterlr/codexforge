param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2316 Provider Adapter Manifest Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-manifest-preview.ps1"
  Domain = "provider-adapter-manifest-preview"
  Route = "provider-adapter-manifest-preview"
  CommandLabel = "Go to Provider Adapter Manifest Preview"
  RouteHref = "/provider-adapter-manifest-preview"
  Markers = @("Provider adapter manifest preview", "Provider adapter manifest preview defines adapter metadata requirements without discovering remote providers or reading credentials", "Provider adapter manifest preview uses synthetic provider family capability privacy and approval metadata only", "Provider adapter manifest preview keeps adapter discovery backend-owned", "Denied provider adapter manifest paths remain blocked", "Provider adapter manifest checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
