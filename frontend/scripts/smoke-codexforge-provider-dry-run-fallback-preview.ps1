param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2360 Provider Dry Run Fallback Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-fallback-preview.ps1"
  Domain = "provider-dry-run-fallback-preview"
  Route = "provider-dry-run-fallback-preview"
  CommandLabel = "Go to Provider Dry Run Fallback Preview"
  RouteHref = "/provider-dry-run-fallback-preview"
  Phase = 2360
  Title = "Provider Dry Run Fallback Preview"
  Markers = @(
  'Provider dry run fallback preview',
  'Provider dry run fallback preview defines synthetic fallback routing without routing prompts or calling fallback providers',
  'Provider dry run fallback preview keeps fallback selection backend-owned and approval-gated',
  'Provider dry run fallback preview blocks live fallback execution',
  'Denied provider dry run fallback paths remain blocked',
  'Provider dry run fallback checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

