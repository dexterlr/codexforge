param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2312 Controlled Provider Gateway Wiring Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-provider-gateway-wiring-release-candidate.ps1"
  Domain = "controlled-provider-gateway-wiring-release-candidate"
  Route = "controlled-provider-gateway-wiring-release-candidate"
  CommandLabel = "Go to Controlled Provider Gateway Wiring Release Candidate"
  RouteHref = "/controlled-provider-gateway-wiring-release-candidate"
  Markers = @("Controlled provider gateway wiring release candidate", "Controlled provider gateway wiring release candidate does not call providers call models send prompts stream responses store credentials store tokens persist outputs write browser storage upload download render export publish schedule dispatch queues spawn workers run commands create APIs create services or call connectors", "Controlled provider gateway wiring release candidate adds review-only provider gateway contracts and disabled adapter registry", "Controlled provider gateway wiring release candidate requires backend-owned provider gateway explicit operator approval and audit trail before live execution", "Denied controlled provider gateway wiring paths remain blocked", "Controlled provider gateway wiring checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
