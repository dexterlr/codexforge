param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2569 First Approved Provider Trial Completion Candidate"
  ScriptFile = "smoke-codexforge-first-approved-provider-trial-completion-candidate.ps1"
  Domain = "first-approved-provider-trial-completion-candidate"
  Route = "first-approved-provider-trial-completion-candidate"
  CommandLabel = "Go to First Approved Provider Trial Completion Candidate"
  RouteHref = "/first-approved-provider-trial-completion-candidate"
  Phase = 2569
  Title = "First Approved Provider Trial Completion Candidate"
  Markers = @(
  'First approved provider trial completion candidate'
  'First approved provider trial completion candidate does not implement live provider execution model calls prompt transmission streaming credential storage token storage persistence queue dispatch worker dispatch connector access SDK clients route handlers services or telemetry transmission'
  'First approved provider trial completion candidate closes the first approved provider trial batch and marks readiness for Provider Result Review and Recovery Mega Batch v1'
  'First approved provider trial completion candidate keeps all provider actions blocked pending result review and recovery hardening'
  'Denied first approved provider trial completion paths remain blocked'
  'First approved provider trial completion checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
