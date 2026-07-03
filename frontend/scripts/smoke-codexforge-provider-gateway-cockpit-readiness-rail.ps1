param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2295 Provider Gateway Cockpit Readiness Rail"
  ScriptFile = "smoke-codexforge-provider-gateway-cockpit-readiness-rail.ps1"
  Domain = "provider-gateway-cockpit-readiness-rail"
  Route = "provider-gateway-cockpit-readiness-rail"
  CommandLabel = "Go to Provider Gateway Cockpit Readiness Rail"
  RouteHref = "/provider-gateway-cockpit-readiness-rail"
  Markers = @("Provider gateway cockpit readiness rail", "Provider gateway cockpit readiness rail shows which cockpit surfaces are ready for provider gateway wiring without calling providers", "Provider gateway cockpit readiness rail uses deterministic synthetic data and disabled actions only", "Provider gateway cockpit readiness rail keeps provider execution blocked", "Denied provider cockpit readiness paths remain blocked", "Provider gateway cockpit readiness checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
