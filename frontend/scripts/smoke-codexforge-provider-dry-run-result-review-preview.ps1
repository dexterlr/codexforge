param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2365 Provider Dry Run Result Review Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-result-review-preview.ps1"
  Domain = "provider-dry-run-result-review-preview"
  Route = "provider-dry-run-result-review-preview"
  CommandLabel = "Go to Provider Dry Run Result Review Preview"
  RouteHref = "/provider-dry-run-result-review-preview"
  Phase = 2365
  Title = "Provider Dry Run Result Review Preview"
  Markers = @(
  'Provider dry run result review preview',
  'Provider dry run result review preview defines synthetic result review requirements without receiving real model outputs or persisting results',
  'Provider dry run result review preview keeps result acceptance backend-owned and approval-gated',
  'Provider dry run result review preview blocks output persistence',
  'Denied provider dry run result review paths remain blocked',
  'Provider dry run result review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

