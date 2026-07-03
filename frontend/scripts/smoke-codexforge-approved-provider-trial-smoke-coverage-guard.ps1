param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2568 Approved Provider Trial Smoke Coverage Guard"
  ScriptFile = "smoke-codexforge-approved-provider-trial-smoke-coverage-guard.ps1"
  Domain = "approved-provider-trial-smoke-coverage-guard"
  Route = "approved-provider-trial-smoke-coverage-guard"
  CommandLabel = "Go to Approved Provider Trial Smoke Coverage Guard"
  RouteHref = "/approved-provider-trial-smoke-coverage-guard"
  Phase = 2568
  Title = "Approved Provider Trial Smoke Coverage Guard"
  Markers = @(
  'Approved provider trial smoke coverage guard'
  'Approved provider trial smoke coverage guard verifies approved provider trial batch has targeted smoke scripts and all-smoke registration without removing previous coverage'
  'Approved provider trial smoke coverage guard keeps smoke scanning scoped to approved provider trial batch-owned files to avoid old helper false positives'
  'Approved provider trial smoke coverage guard preserves checkpoint smoke coverage'
  'Denied approved provider smoke coverage regression paths remain blocked'
  'Approved provider smoke coverage checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
