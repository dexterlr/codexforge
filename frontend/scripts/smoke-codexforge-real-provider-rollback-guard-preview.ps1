param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2525 Real Provider Rollback Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-rollback-guard-preview.ps1"
  Domain = "real-provider-rollback-guard-preview"
  Route = "real-provider-rollback-guard-preview"
  CommandLabel = "Go to Real Provider Rollback Guard Preview"
  RouteHref = "/real-provider-rollback-guard-preview"
  Phase = 2525
  Title = "Real Provider Rollback Guard Preview"
  Markers = @(
  'Real provider rollback guard preview'
  'Real provider rollback guard preview defines rollback requirements without mutating records dispatching jobs or reversing live provider work'
  'Real provider rollback guard preview keeps rollback backend-owned and auditable'
  'Real provider rollback guard preview blocks irreversible execution'
  'Denied real provider rollback paths remain blocked'
  'Real provider rollback checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
