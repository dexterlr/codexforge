param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2340 Provider Adapter Checkpoint Completion Guard"
  ScriptFile = "smoke-codexforge-provider-adapter-checkpoint-completion-guard.ps1"
  Domain = "provider-adapter-checkpoint-completion-guard"
  Route = "provider-adapter-checkpoint-completion-guard"
  CommandLabel = "Go to Provider Adapter Checkpoint Completion Guard"
  RouteHref = "/provider-adapter-checkpoint-completion-guard"
  Markers = @("Provider adapter checkpoint completion guard", "Provider adapter checkpoint completion guard updates checkpoint docs through phase 2345 without claiming live provider adapter execution exists", "Provider adapter checkpoint completion guard records next likely batch as First Provider Adapter Dry Run Harness Mega Batch v1", "Provider adapter checkpoint completion guard states provider adapter implementation remains blocked pending backend-owned harness", "Denied provider adapter checkpoint regression paths remain blocked", "Provider adapter checkpoint completion checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
