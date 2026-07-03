param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2585 Provider Result Rollback Review Preview"
  ScriptFile = "smoke-codexforge-provider-result-rollback-review-preview.ps1"
  Domain = "provider-result-rollback-review-preview"
  Route = "provider-result-rollback-review-preview"
  CommandLabel = "Go to Provider Result Rollback Review Preview"
  RouteHref = "/provider-result-rollback-review-preview"
  Phase = 2585
  Title = "Provider Result Rollback Review Preview"
  Markers = @(
  'Provider result rollback review preview'
  'Provider result rollback review preview defines rollback review requirements without mutating records dispatching jobs or reversing live provider work'
  'Provider result rollback review preview keeps rollback backend-owned and auditable'
  'Provider result rollback review preview blocks irreversible execution'
  'Denied provider result rollback paths remain blocked'
  'Provider result rollback checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
