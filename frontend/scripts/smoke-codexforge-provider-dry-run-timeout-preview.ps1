param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2358 Provider Dry Run Timeout Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-timeout-preview.ps1"
  Domain = "provider-dry-run-timeout-preview"
  Route = "provider-dry-run-timeout-preview"
  CommandLabel = "Go to Provider Dry Run Timeout Preview"
  RouteHref = "/provider-dry-run-timeout-preview"
  Phase = 2358
  Title = "Provider Dry Run Timeout Preview"
  Markers = @(
  'Provider dry run timeout preview',
  'Provider dry run timeout preview defines synthetic timeout handling without provider calls or scheduling live work',
  'Provider dry run timeout preview keeps timeout enforcement backend-owned and deterministic',
  'Provider dry run timeout preview blocks live timeout execution',
  'Denied provider dry run timeout paths remain blocked',
  'Provider dry run timeout checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

