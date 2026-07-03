param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2573 Provider Result Privacy Review Preview"
  ScriptFile = "smoke-codexforge-provider-result-privacy-review-preview.ps1"
  Domain = "provider-result-privacy-review-preview"
  Route = "provider-result-privacy-review-preview"
  CommandLabel = "Go to Provider Result Privacy Review Preview"
  RouteHref = "/provider-result-privacy-review-preview"
  Phase = 2573
  Title = "Provider Result Privacy Review Preview"
  Markers = @(
  'Provider result privacy review preview'
  'Provider result privacy review preview defines privacy review requirements without transmitting data or inspecting real secrets'
  'Provider result privacy review preview keeps privacy class redaction and prompt boundary visible'
  'Provider result privacy review preview blocks prompt leakage and sensitive output promotion'
  'Denied provider result privacy review paths remain blocked'
  'Provider result privacy review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
