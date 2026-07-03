param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2361 Provider Dry Run Observability Preview"
  ScriptFile = "smoke-codexforge-provider-dry-run-observability-preview.ps1"
  Domain = "provider-dry-run-observability-preview"
  Route = "provider-dry-run-observability-preview"
  CommandLabel = "Go to Provider Dry Run Observability Preview"
  RouteHref = "/provider-dry-run-observability-preview"
  Phase = 2361
  Title = "Provider Dry Run Observability Preview"
  Markers = @(
  'Provider dry run observability preview',
  'Provider dry run observability preview defines synthetic observability metadata without sending telemetry or writing logs',
  'Provider dry run observability preview keeps telemetry backend-owned and redacted',
  'Provider dry run observability preview blocks telemetry transmission',
  'Denied provider dry run observability paths remain blocked',
  'Provider dry run observability checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

