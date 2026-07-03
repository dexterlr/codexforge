param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2491 Provider Privacy Guard Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-privacy-guard-readiness-preview.ps1"
  Domain = "provider-privacy-guard-readiness-preview"
  Route = "provider-privacy-guard-readiness-preview"
  CommandLabel = "Go to Provider Privacy Guard Readiness Preview"
  RouteHref = "/provider-privacy-guard-readiness-preview"
  Phase = 2491
  Title = "Provider Privacy Guard Readiness Preview"
  Markers = @(
  'Provider privacy guard readiness preview'
  'Provider privacy guard readiness preview defines future privacy guard requirements without transmitting data or inspecting real secrets'
  'Provider privacy guard readiness preview keeps privacy class redaction and prompt boundary required'
  'Provider privacy guard readiness preview blocks prompt leakage'
  'Denied provider privacy guard paths remain blocked'
  'Provider privacy guard checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
