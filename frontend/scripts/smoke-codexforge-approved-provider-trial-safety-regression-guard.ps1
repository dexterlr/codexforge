param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2566 Approved Provider Trial Safety Regression Guard"
  ScriptFile = "smoke-codexforge-approved-provider-trial-safety-regression-guard.ps1"
  Domain = "approved-provider-trial-safety-regression-guard"
  Route = "approved-provider-trial-safety-regression-guard"
  CommandLabel = "Go to Approved Provider Trial Safety Regression Guard"
  RouteHref = "/approved-provider-trial-safety-regression-guard"
  Phase = 2566
  Title = "Approved Provider Trial Safety Regression Guard"
  Markers = @(
  'Approved provider trial safety regression guard'
  'Approved provider trial safety regression guard verifies first approved provider trial remains review-only with no provider calls no model calls no prompt sending no credential storage no token storage no streaming no hidden execution and no SDK clients'
  'Approved provider trial safety regression guard preserves first real provider call guard backend execution controlled dry run approval audit mock result dry run provider adapter and gateway boundaries'
  'Approved provider trial safety regression guard blocks hidden execution affordances'
  'Denied approved provider safety regression paths remain blocked'
  'Approved provider safety regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
