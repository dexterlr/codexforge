param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2503 Provider Backend Execution Safety Regression Guard"
  ScriptFile = "smoke-codexforge-provider-backend-execution-safety-regression-guard.ps1"
  Domain = "provider-backend-execution-safety-regression-guard"
  Route = "provider-backend-execution-safety-regression-guard"
  CommandLabel = "Go to Provider Backend Execution Safety Regression Guard"
  RouteHref = "/provider-backend-execution-safety-regression-guard"
  Phase = 2503
  Title = "Provider Backend Execution Safety Regression Guard"
  Markers = @(
  'Provider backend execution safety regression guard'
  'Provider backend execution safety regression guard verifies backend execution readiness remains review-only with no provider calls no model calls no prompt sending no credential storage no token storage no streaming no hidden execution and no SDK clients'
  'Provider backend execution safety regression guard preserves controlled dry run approval audit mock result dry run provider adapter and gateway boundaries'
  'Provider backend execution safety regression guard blocks hidden execution affordances'
  'Denied provider backend execution safety regression paths remain blocked'
  'Provider backend execution safety regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
