param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2377 Controlled Provider Adapter Dry Run Completion Candidate"
  ScriptFile = "smoke-codexforge-controlled-provider-adapter-dry-run-completion-candidate.ps1"
  Domain = "controlled-provider-adapter-dry-run-completion-candidate"
  Route = "controlled-provider-adapter-dry-run-completion-candidate"
  CommandLabel = "Go to Controlled Provider Adapter Dry Run Completion Candidate"
  RouteHref = "/controlled-provider-adapter-dry-run-completion-candidate"
  Phase = 2377
  Title = "Controlled Provider Adapter Dry Run Completion Candidate"
  Markers = @(
  'Controlled provider adapter dry run completion candidate',
  'Controlled provider adapter dry run completion candidate does not implement live provider execution model calls prompt transmission streaming credential storage token storage persistence queue dispatch worker dispatch connector access SDK clients route handlers services or telemetry transmission',
  'Controlled provider adapter dry run completion candidate closes the dry run harness batch and marks readiness for Provider Adapter Mock Result Harness Mega Batch v1',
  'Controlled provider adapter dry run completion candidate keeps all provider actions blocked pending future approved provider trial',
  'Denied provider adapter dry run completion paths remain blocked',
  'Controlled provider adapter dry run completion checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

