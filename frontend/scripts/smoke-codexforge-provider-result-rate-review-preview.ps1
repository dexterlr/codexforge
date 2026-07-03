param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2583 Provider Result Rate Review Preview"
  ScriptFile = "smoke-codexforge-provider-result-rate-review-preview.ps1"
  Domain = "provider-result-rate-review-preview"
  Route = "provider-result-rate-review-preview"
  CommandLabel = "Go to Provider Result Rate Review Preview"
  RouteHref = "/provider-result-rate-review-preview"
  Phase = 2583
  Title = "Provider Result Rate Review Preview"
  Markers = @(
  'Provider result rate review preview'
  'Provider result rate review preview defines rate review states without storing counters or sending provider traffic'
  'Provider result rate review preview keeps rate limits backend-owned and auditable'
  'Provider result rate review preview blocks live traffic'
  'Denied provider result rate review paths remain blocked'
  'Provider result rate review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
