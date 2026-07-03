param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2359 Provider Dry Run Retry Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-retry-preview.ps1"
  Domain = "provider-dry-run-retry-preview"
  Route = "provider-dry-run-retry-preview"
  CommandLabel = "Go to Provider Dry Run Retry Preview"
  RouteHref = "/provider-dry-run-retry-preview"
  Phase = 2359
  Title = "Provider Dry Run Retry Preview"
  Markers = @(
  'Provider dry run retry preview',
  'Provider dry run retry preview defines synthetic retry state without retrying provider calls or storing retry state',
  'Provider dry run retry preview keeps retries backend-owned and auditable',
  'Provider dry run retry preview blocks live retry execution',
  'Denied provider dry run retry paths remain blocked',
  'Provider dry run retry checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

