param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2373 Provider Dry Run Smoke Coverage Guard"
  ScriptFile = "smoke-codexforge-provider-dry-run-smoke-coverage-guard.ps1"
  Domain = "provider-dry-run-smoke-coverage-guard"
  Route = "provider-dry-run-smoke-coverage-guard"
  CommandLabel = "Go to Provider Dry Run Smoke Coverage Guard"
  RouteHref = "/provider-dry-run-smoke-coverage-guard"
  Phase = 2373
  Title = "Provider Dry Run Smoke Coverage Guard"
  Markers = @(
  'Provider dry run smoke coverage guard',
  'Provider dry run smoke coverage guard verifies provider dry run batch has targeted smoke scripts and all-smoke registration without removing previous coverage',
  'Provider dry run smoke coverage guard keeps smoke scanning scoped to provider dry run batch-owned files to avoid old helper false positives',
  'Provider dry run smoke coverage guard preserves checkpoint smoke coverage',
  'Denied provider dry run smoke coverage regression paths remain blocked',
  'Provider dry run smoke coverage checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

