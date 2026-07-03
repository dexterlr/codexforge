param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2547 Approved Provider Trial Rate Limit Gate Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-rate-limit-gate-preview.ps1"
  Domain = "approved-provider-trial-rate-limit-gate-preview"
  Route = "approved-provider-trial-rate-limit-gate-preview"
  CommandLabel = "Go to Approved Provider Trial Rate Limit Gate Preview"
  RouteHref = "/approved-provider-trial-rate-limit-gate-preview"
  Phase = 2547
  Title = "Approved Provider Trial Rate Limit Gate Preview"
  Markers = @(
  'Approved provider trial rate limit gate preview'
  'Approved provider trial rate limit gate preview defines rate limit requirements without storing counters or sending provider traffic'
  'Approved provider trial rate limit gate preview keeps rate limits backend-owned and auditable'
  'Approved provider trial rate limit gate preview blocks live traffic'
  'Denied approved provider rate limit paths remain blocked'
  'Approved provider rate limit checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
