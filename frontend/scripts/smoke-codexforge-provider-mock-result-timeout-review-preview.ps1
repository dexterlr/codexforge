param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2391 Provider Mock Result Timeout Review Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-timeout-review-preview.ps1"
  Domain = "provider-mock-result-timeout-review-preview"
  Route = "provider-mock-result-timeout-review-preview"
  CommandLabel = "Go to Provider Mock Result Timeout Review Preview"
  RouteHref = "/provider-mock-result-timeout-review-preview"
  Phase = 2391
  Title = "Provider Mock Result Timeout Review Preview"
  Markers = @(
  'Provider mock result timeout review preview',
  'Provider mock result timeout review preview defines synthetic timeout result states without provider calls or scheduling live work',
  'Provider mock result timeout review preview keeps timeout enforcement backend-owned and deterministic',
  'Provider mock result timeout review preview blocks live timeout execution',
  'Denied provider mock result timeout review paths remain blocked',
  'Provider mock result timeout review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
