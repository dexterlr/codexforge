param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2571 Provider Result Review Envelope Preview"
  ScriptFile = "smoke-codexforge-provider-result-review-envelope-preview.ps1"
  Domain = "provider-result-review-envelope-preview"
  Route = "provider-result-review-envelope-preview"
  CommandLabel = "Go to Provider Result Review Envelope Preview"
  RouteHref = "/provider-result-review-envelope-preview"
  Phase = 2571
  Title = "Provider Result Review Envelope Preview"
  Markers = @(
  'Provider result review envelope preview'
  'Provider result review envelope preview defines synthetic result review envelope shape without receiving real model output or persisting provider results'
  'Provider result review envelope preview includes result id approval id audit id safety state privacy state redaction state rejection state recovery state and denied execution state'
  'Provider result review envelope preview keeps result review backend-owned and review-only'
  'Denied provider result review envelope paths remain blocked'
  'Provider result review envelope checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
