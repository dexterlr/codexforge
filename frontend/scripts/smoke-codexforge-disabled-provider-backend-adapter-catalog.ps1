param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2329 Disabled Provider Backend Adapter Catalog"
  ScriptFile = "smoke-codexforge-disabled-provider-backend-adapter-catalog.ps1"
  Domain = "disabled-provider-backend-adapter-catalog"
  Route = "disabled-provider-backend-adapter-catalog"
  CommandLabel = "Go to Disabled Provider Backend Adapter Catalog"
  RouteHref = "/disabled-provider-backend-adapter-catalog"
  Markers = @("Disabled provider backend adapter catalog", "Disabled provider backend adapter catalog lists synthetic disabled adapter families without importing provider SDKs creating clients or calling remote APIs", "Disabled provider backend adapter catalog keeps all adapters disabled pending future backend-owned harness", "Disabled provider backend adapter catalog blocks live execution", "Denied disabled provider backend adapter paths remain blocked", "Disabled provider backend adapter catalog checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
