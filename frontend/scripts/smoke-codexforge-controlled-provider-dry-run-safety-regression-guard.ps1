param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2469 Controlled Provider Dry Run Safety Regression Guard"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-safety-regression-guard.ps1"
  Domain = "controlled-provider-dry-run-safety-regression-guard"
  Route = "controlled-provider-dry-run-safety-regression-guard"
  CommandLabel = "Go to Controlled Provider Dry Run Safety Regression Guard"
  RouteHref = "/controlled-provider-dry-run-safety-regression-guard"
  Phase = 2469
  Title = "Controlled Provider Dry Run Safety Regression Guard"
  Markers = @(
  'Controlled provider dry run safety regression guard'
  'Controlled provider dry run safety regression guard verifies controlled provider dry run candidate remains review-only with no provider calls no model calls no prompt sending no credential storage no token storage no streaming no hidden execution and no SDK clients'
  'Controlled provider dry run safety regression guard preserves approval audit mock result dry run provider adapter and gateway boundaries'
  'Controlled provider dry run safety regression guard blocks hidden execution affordances'
  'Denied controlled provider safety regression paths remain blocked'
  'Controlled provider safety regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
