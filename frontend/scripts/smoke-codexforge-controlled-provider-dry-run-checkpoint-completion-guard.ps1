param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2472 Controlled Provider Dry Run Checkpoint Completion Guard"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-checkpoint-completion-guard.ps1"
  Domain = "controlled-provider-dry-run-checkpoint-completion-guard"
  Route = "controlled-provider-dry-run-checkpoint-completion-guard"
  CommandLabel = "Go to Controlled Provider Dry Run Checkpoint Completion Guard"
  RouteHref = "/controlled-provider-dry-run-checkpoint-completion-guard"
  Phase = 2472
  Title = "Controlled Provider Dry Run Checkpoint Completion Guard"
  Markers = @(
  'Controlled provider dry run checkpoint completion guard'
  'Controlled provider dry run checkpoint completion guard updates checkpoint docs through phase 2473 without claiming live provider execution exists'
  'Controlled provider dry run checkpoint completion guard records next likely batch as Provider Backend Execution Readiness Mega Batch v1'
  'Controlled provider dry run checkpoint completion guard states provider execution remains blocked pending backend execution readiness'
  'Denied controlled provider checkpoint regression paths remain blocked'
  'Controlled provider checkpoint completion checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
