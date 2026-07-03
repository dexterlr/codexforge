param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2393 Provider Mock Result Observability Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-observability-preview.ps1"
  Domain = "provider-mock-result-observability-preview"
  Route = "provider-mock-result-observability-preview"
  CommandLabel = "Go to Provider Mock Result Observability Preview"
  RouteHref = "/provider-mock-result-observability-preview"
  Phase = 2393
  Title = "Provider Mock Result Observability Preview"
  Markers = @(
  'Provider mock result observability preview',
  'Provider mock result observability preview defines synthetic observability metadata without sending telemetry or writing logs',
  'Provider mock result observability preview keeps telemetry backend-owned and redacted',
  'Provider mock result observability preview blocks telemetry transmission',
  'Denied provider mock result observability paths remain blocked',
  'Provider mock result observability checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
