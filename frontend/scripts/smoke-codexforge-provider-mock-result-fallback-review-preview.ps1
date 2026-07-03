param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2392 Provider Mock Result Fallback Review Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-fallback-review-preview.ps1"
  Domain = "provider-mock-result-fallback-review-preview"
  Route = "provider-mock-result-fallback-review-preview"
  CommandLabel = "Go to Provider Mock Result Fallback Review Preview"
  RouteHref = "/provider-mock-result-fallback-review-preview"
  Phase = 2392
  Title = "Provider Mock Result Fallback Review Preview"
  Markers = @(
  'Provider mock result fallback review preview',
  'Provider mock result fallback review preview defines synthetic fallback result handling without routing prompts or calling fallback providers',
  'Provider mock result fallback review preview keeps fallback selection backend-owned and approval-gated',
  'Provider mock result fallback review preview blocks live fallback execution',
  'Denied provider mock result fallback review paths remain blocked',
  'Provider mock result fallback review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
