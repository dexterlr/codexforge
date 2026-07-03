param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2600 Provider Result Review Smoke Coverage Guard"
  ScriptFile = "smoke-codexforge-provider-result-review-smoke-coverage-guard.ps1"
  Domain = "provider-result-review-smoke-coverage-guard"
  Route = "provider-result-review-smoke-coverage-guard"
  CommandLabel = "Go to Provider Result Review Smoke Coverage Guard"
  RouteHref = "/provider-result-review-smoke-coverage-guard"
  Phase = 2600
  Title = "Provider Result Review Smoke Coverage Guard"
  Markers = @(
  'Provider result review smoke coverage guard'
  'Provider result review smoke coverage guard verifies provider result review recovery batch has targeted smoke scripts and all-smoke registration without removing previous coverage'
  'Provider result review smoke coverage guard keeps smoke scanning scoped to provider result review batch-owned files to avoid old helper false positives'
  'Provider result review smoke coverage guard preserves checkpoint smoke coverage'
  'Denied provider result smoke coverage regression paths remain blocked'
  'Provider result smoke coverage checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
