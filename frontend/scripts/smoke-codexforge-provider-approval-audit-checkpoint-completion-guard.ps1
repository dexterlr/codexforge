param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2439 Provider Approval Audit Checkpoint Completion Guard"
  ScriptFile = "smoke-codexforge-provider-approval-audit-checkpoint-completion-guard.ps1"
  Domain = "provider-approval-audit-checkpoint-completion-guard"
  Route = "provider-approval-audit-checkpoint-completion-guard"
  CommandLabel = "Go to Provider Approval Audit Checkpoint Completion Guard"
  RouteHref = "/provider-approval-audit-checkpoint-completion-guard"
  Phase = 2439
  Title = "Provider Approval Audit Checkpoint Completion Guard"
  Markers = @(
  'Provider approval audit checkpoint completion guard'
  'Provider approval audit checkpoint completion guard updates checkpoint docs through phase 2441 without claiming live provider execution exists'
  'Provider approval audit checkpoint completion guard records next likely batch as First Controlled Provider Dry Run Candidate Mega Batch v1'
  'Provider approval audit checkpoint completion guard states provider execution remains blocked pending controlled dry run candidate'
  'Denied provider approval audit checkpoint regression paths remain blocked'
  'Provider approval audit checkpoint completion checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
