param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2286 Provider Model Family Catalog Preview"
  ScriptFile = "smoke-codexforge-provider-model-family-catalog-preview.ps1"
  Domain = "provider-model-family-catalog-preview"
  Route = "provider-model-family-catalog-preview"
  CommandLabel = "Go to Provider Model Family Catalog Preview"
  RouteHref = "/provider-model-family-catalog-preview"
  Markers = @("Provider model family catalog preview", "Provider model family catalog preview lists synthetic model family buckets without querying providers or storing tokens", "Provider model family catalog preview does not call model APIs read credentials fetch remote catalogs or persist provider metadata", "Provider model family catalog preview keeps model discovery backend-owned", "Denied provider model family catalog paths remain blocked", "Provider model family catalog checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
