param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2483 Provider Response Capture Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-response-capture-readiness-preview.ps1"
  Domain = "provider-response-capture-readiness-preview"
  Route = "provider-response-capture-readiness-preview"
  CommandLabel = "Go to Provider Response Capture Readiness Preview"
  RouteHref = "/provider-response-capture-readiness-preview"
  Phase = 2483
  Title = "Provider Response Capture Readiness Preview"
  Markers = @(
  'Provider response capture readiness preview'
  'Provider response capture readiness preview defines future response capture requirements without receiving model output streaming tokens or persisting outputs'
  'Provider response capture readiness preview keeps result capture backend-owned and review-gated'
  'Provider response capture readiness preview blocks output persistence'
  'Denied provider response capture paths remain blocked'
  'Provider response capture checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
