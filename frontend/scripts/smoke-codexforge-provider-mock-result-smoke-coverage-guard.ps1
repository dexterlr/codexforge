param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2405 Provider Mock Result Smoke Coverage Guard"
  ScriptFile = "smoke-codexforge-provider-mock-result-smoke-coverage-guard.ps1"
  Domain = "provider-mock-result-smoke-coverage-guard"
  Route = "provider-mock-result-smoke-coverage-guard"
  CommandLabel = "Go to Provider Mock Result Smoke Coverage Guard"
  RouteHref = "/provider-mock-result-smoke-coverage-guard"
  Phase = 2405
  Title = "Provider Mock Result Smoke Coverage Guard"
  Markers = @(
  'Provider mock result smoke coverage guard',
  'Provider mock result smoke coverage guard verifies provider mock result batch has targeted smoke scripts and all-smoke registration without removing previous coverage',
  'Provider mock result smoke coverage guard keeps smoke scanning scoped to provider mock result batch-owned files to avoid old helper false positives',
  'Provider mock result smoke coverage guard preserves checkpoint smoke coverage',
  'Denied provider mock result smoke coverage regression paths remain blocked',
  'Provider mock result smoke coverage checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
