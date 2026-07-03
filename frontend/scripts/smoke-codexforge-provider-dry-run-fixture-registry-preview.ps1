param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2349 Provider Dry Run Fixture Registry Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-fixture-registry-preview.ps1"
  Domain = "provider-dry-run-fixture-registry-preview"
  Route = "provider-dry-run-fixture-registry-preview"
  CommandLabel = "Go to Provider Dry Run Fixture Registry Preview"
  RouteHref = "/provider-dry-run-fixture-registry-preview"
  Phase = 2349
  Title = "Provider Dry Run Fixture Registry Preview"
  Markers = @(
  'Provider dry run fixture registry preview',
  'Provider dry run fixture registry preview lists deterministic synthetic fixtures without storing real prompts credentials tokens outputs or provider data',
  'Provider dry run fixture registry preview keeps fixtures safe review-only and local-state only',
  'Provider dry run fixture registry preview blocks real data capture',
  'Denied provider dry run fixture paths remain blocked',
  'Provider dry run fixture registry checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

