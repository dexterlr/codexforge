param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2403 Provider Mock Result Safety Regression Guard"
  ScriptFile = "smoke-codexforge-provider-mock-result-safety-regression-guard.ps1"
  Domain = "provider-mock-result-safety-regression-guard"
  Route = "provider-mock-result-safety-regression-guard"
  CommandLabel = "Go to Provider Mock Result Safety Regression Guard"
  RouteHref = "/provider-mock-result-safety-regression-guard"
  Phase = 2403
  Title = "Provider Mock Result Safety Regression Guard"
  Markers = @(
  'Provider mock result safety regression guard',
  'Provider mock result safety regression guard verifies provider mock result harness remains review-only with no provider calls no model calls no prompt sending no credential storage no token storage no streaming no hidden execution and no SDK clients',
  'Provider mock result safety regression guard preserves provider dry run provider adapter contract and provider gateway boundaries',
  'Provider mock result safety regression guard blocks hidden mock result execution affordances',
  'Denied provider mock result safety regression paths remain blocked',
  'Provider mock result safety regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
