param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2584 Provider Result Observability Review Preview"
  ScriptFile = "smoke-codexforge-provider-result-observability-review-preview.ps1"
  Domain = "provider-result-observability-review-preview"
  Route = "provider-result-observability-review-preview"
  CommandLabel = "Go to Provider Result Observability Review Preview"
  RouteHref = "/provider-result-observability-review-preview"
  Phase = 2584
  Title = "Provider Result Observability Review Preview"
  Markers = @(
  'Provider result observability review preview'
  'Provider result observability review preview defines observability review metadata without sending telemetry writing logs or external traces'
  'Provider result observability review preview keeps telemetry backend-owned and redacted'
  'Provider result observability review preview blocks telemetry transmission'
  'Denied provider result observability paths remain blocked'
  'Provider result observability checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
