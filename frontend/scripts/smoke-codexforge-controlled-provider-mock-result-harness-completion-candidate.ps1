param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2409 Controlled Provider Mock Result Harness Completion Candidate"
  ScriptFile = "smoke-codexforge-controlled-provider-mock-result-harness-completion-candidate.ps1"
  Domain = "controlled-provider-mock-result-harness-completion-candidate"
  Route = "controlled-provider-mock-result-harness-completion-candidate"
  CommandLabel = "Go to Controlled Provider Mock Result Harness Completion Candidate"
  RouteHref = "/controlled-provider-mock-result-harness-completion-candidate"
  Phase = 2409
  Title = "Controlled Provider Mock Result Harness Completion Candidate"
  Markers = @(
  'Controlled provider mock result harness completion candidate',
  'Controlled provider mock result harness completion candidate does not implement live provider execution model calls prompt transmission streaming credential storage token storage persistence queue dispatch worker dispatch connector access SDK clients route handlers services or telemetry transmission',
  'Controlled provider mock result harness completion candidate closes the mock result harness batch and marks readiness for Provider Approval Audit Enforcement Boundary Mega Batch v1',
  'Controlled provider mock result harness completion candidate keeps all provider actions blocked pending approval audit enforcement',
  'Denied provider mock result harness completion paths remain blocked',
  'Controlled provider mock result harness completion checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
