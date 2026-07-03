param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2505 Provider Backend Execution Completion Candidate"
  ScriptFile = "smoke-codexforge-provider-backend-execution-completion-candidate.ps1"
  Domain = "provider-backend-execution-completion-candidate"
  Route = "provider-backend-execution-completion-candidate"
  CommandLabel = "Go to Provider Backend Execution Completion Candidate"
  RouteHref = "/provider-backend-execution-completion-candidate"
  Phase = 2505
  Title = "Provider Backend Execution Completion Candidate"
  Markers = @(
  'Provider backend execution completion candidate'
  'Provider backend execution completion candidate does not implement live provider execution model calls prompt transmission streaming credential storage token storage persistence queue dispatch worker dispatch connector access SDK clients route handlers services or telemetry transmission'
  'Provider backend execution completion candidate closes the provider backend execution readiness batch and marks readiness for First Real Provider Call Guard Mega Batch v1'
  'Provider backend execution completion candidate keeps all provider actions blocked pending first real provider call guard'
  'Denied provider backend execution completion paths remain blocked'
  'Provider backend execution completion checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
