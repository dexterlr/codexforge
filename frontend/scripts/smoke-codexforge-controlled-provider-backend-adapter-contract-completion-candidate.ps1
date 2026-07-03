param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2345 Controlled Provider Backend Adapter Contract Completion Candidate"
  ScriptFile = "smoke-codexforge-controlled-provider-backend-adapter-contract-completion-candidate.ps1"
  Domain = "controlled-provider-backend-adapter-contract-completion-candidate"
  Route = "controlled-provider-backend-adapter-contract-completion-candidate"
  CommandLabel = "Go to Controlled Provider Backend Adapter Contract Completion Candidate"
  RouteHref = "/controlled-provider-backend-adapter-contract-completion-candidate"
  Markers = @("Controlled provider backend adapter contract completion candidate", "Controlled provider backend adapter contract completion candidate does not implement live provider execution model calls prompt transmission streaming credential storage token storage persistence queue dispatch worker dispatch connector access SDK clients route handlers services or telemetry transmission", "Controlled provider backend adapter contract completion candidate closes the provider backend adapter contract batch and marks readiness for First Provider Adapter Dry Run Harness Mega Batch v1", "Controlled provider backend adapter contract completion candidate keeps all adapter actions blocked pending backend-owned dry run harness", "Denied provider backend adapter completion paths remain blocked", "Controlled provider backend adapter completion checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
