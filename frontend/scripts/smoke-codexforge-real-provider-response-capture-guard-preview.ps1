param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2515 Real Provider Response Capture Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-response-capture-guard-preview.ps1"
  Domain = "real-provider-response-capture-guard-preview"
  Route = "real-provider-response-capture-guard-preview"
  CommandLabel = "Go to Real Provider Response Capture Guard Preview"
  RouteHref = "/real-provider-response-capture-guard-preview"
  Phase = 2515
  Title = "Real Provider Response Capture Guard Preview"
  Markers = @(
  'Real provider response capture guard preview'
  'Real provider response capture guard preview defines future response capture rules without receiving model output streaming tokens or persisting outputs'
  'Real provider response capture guard preview keeps result capture backend-owned and review-gated'
  'Real provider response capture guard preview blocks output persistence'
  'Denied real provider response capture paths remain blocked'
  'Real provider response capture checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
