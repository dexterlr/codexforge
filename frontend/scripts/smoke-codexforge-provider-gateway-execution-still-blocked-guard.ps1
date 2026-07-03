param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2311 Provider Gateway Execution Still Blocked Guard"
  ScriptFile = "smoke-codexforge-provider-gateway-execution-still-blocked-guard.ps1"
  Domain = "provider-gateway-execution-still-blocked-guard"
  Route = "provider-gateway-execution-still-blocked-guard"
  CommandLabel = "Go to Provider Gateway Execution Still Blocked Guard"
  RouteHref = "/provider-gateway-execution-still-blocked-guard"
  Markers = @("Provider gateway execution still blocked guard", "Provider gateway execution still blocked guard verifies no live provider execution is exposed by the cockpit or diagnostic pages", "Provider gateway execution still blocked guard confirms prompt sending credential storage token storage streaming and provider calls remain blocked", "Provider gateway execution still blocked guard keeps protected actions disabled", "Denied provider execution still blocked paths remain blocked", "Provider gateway execution still blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
