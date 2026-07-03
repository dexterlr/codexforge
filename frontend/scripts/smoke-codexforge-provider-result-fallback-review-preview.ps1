param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2580 Provider Result Fallback Review Preview"
  ScriptFile = "smoke-codexforge-provider-result-fallback-review-preview.ps1"
  Domain = "provider-result-fallback-review-preview"
  Route = "provider-result-fallback-review-preview"
  CommandLabel = "Go to Provider Result Fallback Review Preview"
  RouteHref = "/provider-result-fallback-review-preview"
  Phase = 2580
  Title = "Provider Result Fallback Review Preview"
  Markers = @(
  'Provider result fallback review preview'
  'Provider result fallback review preview defines fallback review states without routing prompts or calling fallback providers'
  'Provider result fallback review preview keeps fallback backend-owned and approval-gated'
  'Provider result fallback review preview blocks live fallback execution'
  'Denied provider result fallback review paths remain blocked'
  'Provider result fallback review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
