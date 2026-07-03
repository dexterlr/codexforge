param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2473 Controlled Provider Dry Run Completion Candidate"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-completion-candidate.ps1"
  Domain = "controlled-provider-dry-run-completion-candidate"
  Route = "controlled-provider-dry-run-completion-candidate"
  CommandLabel = "Go to Controlled Provider Dry Run Completion Candidate"
  RouteHref = "/controlled-provider-dry-run-completion-candidate"
  Phase = 2473
  Title = "Controlled Provider Dry Run Completion Candidate"
  Markers = @(
  'Controlled provider dry run completion candidate'
  'Controlled provider dry run completion candidate does not implement live provider execution model calls prompt transmission streaming credential storage token storage persistence queue dispatch worker dispatch connector access SDK clients route handlers services or telemetry transmission'
  'Controlled provider dry run completion candidate closes the first controlled provider dry run candidate batch and marks readiness for Provider Backend Execution Readiness Mega Batch v1'
  'Controlled provider dry run completion candidate keeps all provider actions blocked pending backend execution readiness'
  'Denied controlled provider dry run completion paths remain blocked'
  'Controlled provider dry run completion checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
