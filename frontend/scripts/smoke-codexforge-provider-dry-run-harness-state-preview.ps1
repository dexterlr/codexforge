param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2364 Provider Dry Run Harness State Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-harness-state-preview.ps1"
  Domain = "provider-dry-run-harness-state-preview"
  Route = "provider-dry-run-harness-state-preview"
  CommandLabel = "Go to Provider Dry Run Harness State Preview"
  RouteHref = "/provider-dry-run-harness-state-preview"
  Phase = 2364
  Title = "Provider Dry Run Harness State Preview"
  Markers = @(
  'Provider dry run harness state preview',
  'Provider dry run harness state preview defines synthetic dry run states without starting jobs queues workers services or route handlers',
  'Provider dry run harness state preview keeps state local deterministic and review-only',
  'Provider dry run harness state preview blocks dispatch',
  'Denied provider dry run harness state paths remain blocked',
  'Provider dry run harness state checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

