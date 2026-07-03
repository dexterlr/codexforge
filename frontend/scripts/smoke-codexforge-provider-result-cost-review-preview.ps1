param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2582 Provider Result Cost Review Preview"
  ScriptFile = "smoke-codexforge-provider-result-cost-review-preview.ps1"
  Domain = "provider-result-cost-review-preview"
  Route = "provider-result-cost-review-preview"
  CommandLabel = "Go to Provider Result Cost Review Preview"
  RouteHref = "/provider-result-cost-review-preview"
  Phase = 2582
  Title = "Provider Result Cost Review Preview"
  Markers = @(
  'Provider result cost review preview'
  'Provider result cost review preview defines cost review states without calling billing endpoints or providers'
  'Provider result cost review preview keeps spend controls backend-owned and approval-gated'
  'Provider result cost review preview blocks paid execution'
  'Denied provider result cost review paths remain blocked'
  'Provider result cost review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
