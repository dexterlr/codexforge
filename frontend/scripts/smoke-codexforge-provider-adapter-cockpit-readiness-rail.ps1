param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2330 Provider Adapter Cockpit Readiness Rail"
  ScriptFile = "smoke-codexforge-provider-adapter-cockpit-readiness-rail.ps1"
  Domain = "provider-adapter-cockpit-readiness-rail"
  Route = "provider-adapter-cockpit-readiness-rail"
  CommandLabel = "Go to Provider Adapter Cockpit Readiness Rail"
  RouteHref = "/provider-adapter-cockpit-readiness-rail"
  Markers = @("Provider adapter cockpit readiness rail", "Provider adapter cockpit readiness rail shows cockpit readiness for backend adapter contracts without executing adapters", "Provider adapter cockpit readiness rail uses deterministic synthetic data only and disabled actions", "Provider adapter cockpit readiness rail keeps adapter implementation blocked", "Denied provider adapter cockpit readiness paths remain blocked", "Provider adapter cockpit readiness checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
