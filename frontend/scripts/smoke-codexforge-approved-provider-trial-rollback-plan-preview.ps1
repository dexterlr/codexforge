param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2553 Approved Provider Trial Rollback Plan Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-rollback-plan-preview.ps1"
  Domain = "approved-provider-trial-rollback-plan-preview"
  Route = "approved-provider-trial-rollback-plan-preview"
  CommandLabel = "Go to Approved Provider Trial Rollback Plan Preview"
  RouteHref = "/approved-provider-trial-rollback-plan-preview"
  Phase = 2553
  Title = "Approved Provider Trial Rollback Plan Preview"
  Markers = @(
  'Approved provider trial rollback plan preview'
  'Approved provider trial rollback plan preview defines rollback requirements without mutating records dispatching jobs or reversing live provider work'
  'Approved provider trial rollback plan preview keeps rollback backend-owned and auditable'
  'Approved provider trial rollback plan preview blocks irreversible execution'
  'Denied approved provider rollback paths remain blocked'
  'Approved provider rollback checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
