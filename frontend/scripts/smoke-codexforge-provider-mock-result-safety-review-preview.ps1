param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2383 Provider Mock Result Safety Review Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-safety-review-preview.ps1"
  Domain = "provider-mock-result-safety-review-preview"
  Route = "provider-mock-result-safety-review-preview"
  CommandLabel = "Go to Provider Mock Result Safety Review Preview"
  RouteHref = "/provider-mock-result-safety-review-preview"
  Phase = 2383
  Title = "Provider Mock Result Safety Review Preview"
  Markers = @(
  'Provider mock result safety review preview',
  'Provider mock result safety review preview defines safety review criteria for synthetic mock outputs without processing real provider responses',
  'Provider mock result safety review preview keeps safety review required before future result acceptance',
  'Provider mock result safety review preview blocks unsafe acceptance',
  'Denied provider mock result safety review paths remain blocked',
  'Provider mock result safety review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
