param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2307 Provider Gateway Checkpoint Completion Guard"
  ScriptFile = "smoke-codexforge-provider-gateway-checkpoint-completion-guard.ps1"
  Domain = "provider-gateway-checkpoint-completion-guard"
  Route = "provider-gateway-checkpoint-completion-guard"
  CommandLabel = "Go to Provider Gateway Checkpoint Completion Guard"
  RouteHref = "/provider-gateway-checkpoint-completion-guard"
  Markers = @("Provider gateway checkpoint completion guard", "Provider gateway checkpoint completion guard updates checkpoint docs through phase 2313 without claiming live provider execution exists", "Provider gateway checkpoint completion guard records next likely batch as Provider Gateway Backend Adapter Contract Mega Batch v1", "Provider gateway checkpoint completion guard states provider execution remains blocked pending backend-owned adapter implementation", "Denied provider checkpoint regression paths remain blocked", "Provider gateway checkpoint completion checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-wiring-smoke-helper.ps1") @params
