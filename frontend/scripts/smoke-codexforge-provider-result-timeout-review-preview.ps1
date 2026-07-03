param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2581 Provider Result Timeout Review Preview"
  ScriptFile = "smoke-codexforge-provider-result-timeout-review-preview.ps1"
  Domain = "provider-result-timeout-review-preview"
  Route = "provider-result-timeout-review-preview"
  CommandLabel = "Go to Provider Result Timeout Review Preview"
  RouteHref = "/provider-result-timeout-review-preview"
  Phase = 2581
  Title = "Provider Result Timeout Review Preview"
  Markers = @(
  'Provider result timeout review preview'
  'Provider result timeout review preview defines timeout review states without provider calls or scheduling live work'
  'Provider result timeout review preview keeps timeout handling backend-owned and deterministic'
  'Provider result timeout review preview blocks live timeout execution'
  'Denied provider result timeout review paths remain blocked'
  'Provider result timeout review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
