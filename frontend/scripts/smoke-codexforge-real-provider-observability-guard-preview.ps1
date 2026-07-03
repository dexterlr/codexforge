param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2524 Real Provider Observability Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-observability-guard-preview.ps1"
  Domain = "real-provider-observability-guard-preview"
  Route = "real-provider-observability-guard-preview"
  CommandLabel = "Go to Real Provider Observability Guard Preview"
  RouteHref = "/real-provider-observability-guard-preview"
  Phase = 2524
  Title = "Real Provider Observability Guard Preview"
  Markers = @(
  'Real provider observability guard preview'
  'Real provider observability guard preview defines observability guard requirements without sending telemetry writing logs or external traces'
  'Real provider observability guard preview keeps telemetry backend-owned and redacted'
  'Real provider observability guard preview blocks telemetry transmission'
  'Denied real provider observability paths remain blocked'
  'Real provider observability checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
