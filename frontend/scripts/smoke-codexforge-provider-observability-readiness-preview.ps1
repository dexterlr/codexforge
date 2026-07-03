param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2492 Provider Observability Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-observability-readiness-preview.ps1"
  Domain = "provider-observability-readiness-preview"
  Route = "provider-observability-readiness-preview"
  CommandLabel = "Go to Provider Observability Readiness Preview"
  RouteHref = "/provider-observability-readiness-preview"
  Phase = 2492
  Title = "Provider Observability Readiness Preview"
  Markers = @(
  'Provider observability readiness preview'
  'Provider observability readiness preview defines future observability requirements without sending telemetry writing logs or external traces'
  'Provider observability readiness preview keeps telemetry backend-owned and redacted'
  'Provider observability readiness preview blocks telemetry transmission'
  'Denied provider observability paths remain blocked'
  'Provider observability checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
