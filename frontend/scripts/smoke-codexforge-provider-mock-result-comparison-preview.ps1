param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2397 Provider Mock Result Comparison Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-comparison-preview.ps1"
  Domain = "provider-mock-result-comparison-preview"
  Route = "provider-mock-result-comparison-preview"
  CommandLabel = "Go to Provider Mock Result Comparison Preview"
  RouteHref = "/provider-mock-result-comparison-preview"
  Phase = 2397
  Title = "Provider Mock Result Comparison Preview"
  Markers = @(
  'Provider mock result comparison preview',
  'Provider mock result comparison preview compares deterministic synthetic outputs without calling providers models or external evaluators',
  'Provider mock result comparison preview keeps evaluation review-only and local-state only',
  'Provider mock result comparison preview blocks automated result promotion',
  'Denied provider mock result comparison paths remain blocked',
  'Provider mock result comparison checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
