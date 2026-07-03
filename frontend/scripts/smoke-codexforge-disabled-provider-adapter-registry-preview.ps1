param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2294 Disabled Provider Adapter Registry Preview"
  ScriptFile = "smoke-codexforge-disabled-provider-adapter-registry-preview.ps1"
  Domain = "disabled-provider-adapter-registry-preview"
  Route = "disabled-provider-adapter-registry-preview"
  CommandLabel = "Go to Disabled Provider Adapter Registry Preview"
  RouteHref = "/disabled-provider-adapter-registry-preview"
  Markers = @("Disabled provider adapter registry preview", "Disabled provider adapter registry preview lists synthetic adapter names and disabled states without importing SDKs or creating clients", "Disabled provider adapter registry preview does not create provider clients store credentials call APIs or fetch remote data", "Disabled provider adapter registry preview keeps all adapters disabled", "Denied disabled provider adapter paths remain blocked", "Disabled provider adapter registry checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
