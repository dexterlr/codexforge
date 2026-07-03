param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2356 Provider Dry Run Cost Estimate Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-cost-estimate-preview.ps1"
  Domain = "provider-dry-run-cost-estimate-preview"
  Route = "provider-dry-run-cost-estimate-preview"
  CommandLabel = "Go to Provider Dry Run Cost Estimate Preview"
  RouteHref = "/provider-dry-run-cost-estimate-preview"
  Phase = 2356
  Title = "Provider Dry Run Cost Estimate Preview"
  Markers = @(
  'Provider dry run cost estimate preview',
  'Provider dry run cost estimate preview defines synthetic cost estimate fields without calling billing endpoints or providers',
  'Provider dry run cost estimate preview keeps spend controls backend-owned',
  'Provider dry run cost estimate preview blocks paid execution',
  'Denied provider dry run cost paths remain blocked',
  'Provider dry run cost checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

