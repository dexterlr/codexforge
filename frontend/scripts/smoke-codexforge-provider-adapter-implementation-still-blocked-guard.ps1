param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2342 Provider Adapter Implementation Still Blocked Guard"
  ScriptFile = "smoke-codexforge-provider-adapter-implementation-still-blocked-guard.ps1"
  Domain = "provider-adapter-implementation-still-blocked-guard"
  Route = "provider-adapter-implementation-still-blocked-guard"
  CommandLabel = "Go to Provider Adapter Implementation Still Blocked Guard"
  RouteHref = "/provider-adapter-implementation-still-blocked-guard"
  Markers = @("Provider adapter implementation still blocked guard", "Provider adapter implementation still blocked guard verifies no backend adapter implementation SDK clients provider calls model calls prompt sending credential storage token storage streaming or telemetry transmission were introduced", "Provider adapter implementation still blocked guard confirms all adapter actions remain disabled", "Provider adapter implementation still blocked guard preserves provider execution safety", "Denied provider adapter implementation blocked paths remain blocked", "Provider adapter implementation still blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
