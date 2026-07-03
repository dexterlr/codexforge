param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2555 Approved Provider Trial Result Placeholder Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-result-placeholder-preview.ps1"
  Domain = "approved-provider-trial-result-placeholder-preview"
  Route = "approved-provider-trial-result-placeholder-preview"
  CommandLabel = "Go to Approved Provider Trial Result Placeholder Preview"
  RouteHref = "/approved-provider-trial-result-placeholder-preview"
  Phase = 2555
  Title = "Approved Provider Trial Result Placeholder Preview"
  Markers = @(
  'Approved provider trial result placeholder preview'
  'Approved provider trial result placeholder preview defines a synthetic result placeholder without receiving model output streaming tokens or persisting outputs'
  'Approved provider trial result placeholder preview keeps result handling backend-owned and review-gated'
  'Approved provider trial result placeholder preview blocks output persistence'
  'Denied approved provider result placeholder paths remain blocked'
  'Approved provider result placeholder checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
