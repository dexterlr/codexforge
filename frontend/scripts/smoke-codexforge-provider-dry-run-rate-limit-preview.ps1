param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2357 Provider Dry Run Rate Limit Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-rate-limit-preview.ps1"
  Domain = "provider-dry-run-rate-limit-preview"
  Route = "provider-dry-run-rate-limit-preview"
  CommandLabel = "Go to Provider Dry Run Rate Limit Preview"
  RouteHref = "/provider-dry-run-rate-limit-preview"
  Phase = 2357
  Title = "Provider Dry Run Rate Limit Preview"
  Markers = @(
  'Provider dry run rate limit preview',
  'Provider dry run rate limit preview defines synthetic rate limit states without storing counters or sending provider traffic',
  'Provider dry run rate limit preview keeps rate limits backend-owned and auditable',
  'Provider dry run rate limit preview blocks live traffic',
  'Denied provider dry run rate limit paths remain blocked',
  'Provider dry run rate limit checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

