param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2471 Controlled Provider Dry Run Smoke Coverage Guard"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-smoke-coverage-guard.ps1"
  Domain = "controlled-provider-dry-run-smoke-coverage-guard"
  Route = "controlled-provider-dry-run-smoke-coverage-guard"
  CommandLabel = "Go to Controlled Provider Dry Run Smoke Coverage Guard"
  RouteHref = "/controlled-provider-dry-run-smoke-coverage-guard"
  Phase = 2471
  Title = "Controlled Provider Dry Run Smoke Coverage Guard"
  Markers = @(
  'Controlled provider dry run smoke coverage guard'
  'Controlled provider dry run smoke coverage guard verifies controlled provider dry run batch has targeted smoke scripts and all-smoke registration without removing previous coverage'
  'Controlled provider dry run smoke coverage guard keeps smoke scanning scoped to controlled provider dry run batch-owned files to avoid old helper false positives'
  'Controlled provider dry run smoke coverage guard preserves checkpoint smoke coverage'
  'Denied controlled provider smoke coverage regression paths remain blocked'
  'Controlled provider smoke coverage checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
