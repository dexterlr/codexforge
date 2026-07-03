param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2552 Approved Provider Trial Observability Gate Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-observability-gate-preview.ps1"
  Domain = "approved-provider-trial-observability-gate-preview"
  Route = "approved-provider-trial-observability-gate-preview"
  CommandLabel = "Go to Approved Provider Trial Observability Gate Preview"
  RouteHref = "/approved-provider-trial-observability-gate-preview"
  Phase = 2552
  Title = "Approved Provider Trial Observability Gate Preview"
  Markers = @(
  'Approved provider trial observability gate preview'
  'Approved provider trial observability gate preview defines observability requirements without sending telemetry writing logs or external traces'
  'Approved provider trial observability gate preview keeps telemetry backend-owned and redacted'
  'Approved provider trial observability gate preview blocks telemetry transmission'
  'Denied approved provider observability paths remain blocked'
  'Approved provider observability checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
