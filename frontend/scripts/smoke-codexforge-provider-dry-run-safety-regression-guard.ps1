param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2371 Provider Dry Run Safety Regression Guard"
  ScriptFile = "smoke-codexforge-provider-dry-run-safety-regression-guard.ps1"
  Domain = "provider-dry-run-safety-regression-guard"
  Route = "provider-dry-run-safety-regression-guard"
  CommandLabel = "Go to Provider Dry Run Safety Regression Guard"
  RouteHref = "/provider-dry-run-safety-regression-guard"
  Phase = 2371
  Title = "Provider Dry Run Safety Regression Guard"
  Markers = @(
  'Provider dry run safety regression guard',
  'Provider dry run safety regression guard verifies provider dry run harness remains review-only with no provider calls no model calls no prompt sending no credential storage no token storage no streaming no hidden execution and no SDK clients',
  'Provider dry run safety regression guard preserves provider gateway backend adapter contracts',
  'Provider dry run safety regression guard blocks hidden dry run execution affordances',
  'Denied provider dry run safety regression paths remain blocked',
  'Provider dry run safety regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

