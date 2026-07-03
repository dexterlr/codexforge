param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2282 Provider Gateway Wiring Map"
  ScriptFile = "smoke-codexforge-provider-gateway-wiring-map.ps1"
  Domain = "provider-gateway-wiring-map"
  Route = "provider-gateway-wiring-map"
  CommandLabel = "Go to Provider Gateway Wiring Map"
  RouteHref = "/provider-gateway-wiring-map"
  Markers = @("Provider gateway wiring map", "Provider gateway wiring map defines safe review-only boundaries between CodexForge cockpit surfaces and future backend-owned provider gateway execution", "Provider gateway wiring map does not call providers call models send prompts store credentials store tokens stream responses persist outputs dispatch queues spawn workers or call connectors", "Provider gateway wiring map keeps provider execution blocked pending backend-owned implementation", "Denied provider gateway wiring map paths remain blocked", "Provider gateway wiring map checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
