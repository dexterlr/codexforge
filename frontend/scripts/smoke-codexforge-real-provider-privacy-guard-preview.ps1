param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2523 Real Provider Privacy Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-privacy-guard-preview.ps1"
  Domain = "real-provider-privacy-guard-preview"
  Route = "real-provider-privacy-guard-preview"
  CommandLabel = "Go to Real Provider Privacy Guard Preview"
  RouteHref = "/real-provider-privacy-guard-preview"
  Phase = 2523
  Title = "Real Provider Privacy Guard Preview"
  Markers = @(
  'Real provider privacy guard preview'
  'Real provider privacy guard preview defines privacy guard requirements without transmitting data or inspecting real secrets'
  'Real provider privacy guard preview keeps privacy class redaction and prompt boundary required'
  'Real provider privacy guard preview blocks prompt leakage'
  'Denied real provider privacy guard paths remain blocked'
  'Real provider privacy guard checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
