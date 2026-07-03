param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2313 Controlled Provider Gateway Wiring Completion Candidate"
  ScriptFile = "smoke-codexforge-controlled-provider-gateway-wiring-completion-candidate.ps1"
  Domain = "controlled-provider-gateway-wiring-completion-candidate"
  Route = "controlled-provider-gateway-wiring-completion-candidate"
  CommandLabel = "Go to Controlled Provider Gateway Wiring Completion Candidate"
  RouteHref = "/controlled-provider-gateway-wiring-completion-candidate"
  Markers = @("Controlled provider gateway wiring completion candidate", "Controlled provider gateway wiring completion candidate does not implement live provider execution model calls prompt transmission streaming credential storage token storage persistence queue dispatch worker dispatch connector access or telemetry transmission", "Controlled provider gateway wiring completion candidate closes the provider gateway wiring batch and marks readiness for Provider Gateway Backend Adapter Contract Mega Batch v1", "Controlled provider gateway wiring completion candidate keeps all provider actions blocked pending backend-owned adapter implementation", "Denied provider gateway completion paths remain blocked", "Controlled provider gateway completion checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
