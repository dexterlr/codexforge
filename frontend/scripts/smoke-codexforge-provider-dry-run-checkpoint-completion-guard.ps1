param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2374 Provider Dry Run Checkpoint Completion Guard"
  ScriptFile = "smoke-codexforge-provider-dry-run-checkpoint-completion-guard.ps1"
  Domain = "provider-dry-run-checkpoint-completion-guard"
  Route = "provider-dry-run-checkpoint-completion-guard"
  CommandLabel = "Go to Provider Dry Run Checkpoint Completion Guard"
  RouteHref = "/provider-dry-run-checkpoint-completion-guard"
  Phase = 2374
  Title = "Provider Dry Run Checkpoint Completion Guard"
  Markers = @(
  'Provider dry run checkpoint completion guard',
  'Provider dry run checkpoint completion guard updates checkpoint docs through phase 2377 without claiming live provider dry run execution exists',
  'Provider dry run checkpoint completion guard records next likely batch as Provider Adapter Mock Result Harness Mega Batch v1',
  'Provider dry run checkpoint completion guard states provider execution remains blocked pending approved provider trial',
  'Denied provider dry run checkpoint regression paths remain blocked',
  'Provider dry run checkpoint completion checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

