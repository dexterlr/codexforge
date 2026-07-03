param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2539 Approved Provider Trial Intent Envelope Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-intent-envelope-preview.ps1"
  Domain = "approved-provider-trial-intent-envelope-preview"
  Route = "approved-provider-trial-intent-envelope-preview"
  CommandLabel = "Go to Approved Provider Trial Intent Envelope Preview"
  RouteHref = "/approved-provider-trial-intent-envelope-preview"
  Phase = 2539
  Title = "Approved Provider Trial Intent Envelope Preview"
  Markers = @(
  'Approved provider trial intent envelope preview'
  'Approved provider trial intent envelope preview defines synthetic approved trial intent without sending prompts or calling providers'
  'Approved provider trial intent envelope preview includes provider family approval id audit id privacy class cost class prompt boundary credential gate SDK gate egress gate and denied execution state'
  'Approved provider trial intent envelope preview keeps trial intent review-only'
  'Denied approved provider trial intent paths remain blocked'
  'Approved provider trial intent checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
