param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2406 Provider Mock Result Checkpoint Completion Guard"
  ScriptFile = "smoke-codexforge-provider-mock-result-checkpoint-completion-guard.ps1"
  Domain = "provider-mock-result-checkpoint-completion-guard"
  Route = "provider-mock-result-checkpoint-completion-guard"
  CommandLabel = "Go to Provider Mock Result Checkpoint Completion Guard"
  RouteHref = "/provider-mock-result-checkpoint-completion-guard"
  Phase = 2406
  Title = "Provider Mock Result Checkpoint Completion Guard"
  Markers = @(
  'Provider mock result checkpoint completion guard',
  'Provider mock result checkpoint completion guard updates checkpoint docs through phase 2409 without claiming live provider execution exists',
  'Provider mock result checkpoint completion guard records next likely batch as Provider Approval Audit Enforcement Boundary Mega Batch v1',
  'Provider mock result checkpoint completion guard states provider execution remains blocked pending approval audit enforcement',
  'Denied provider mock result checkpoint regression paths remain blocked',
  'Provider mock result checkpoint completion checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
