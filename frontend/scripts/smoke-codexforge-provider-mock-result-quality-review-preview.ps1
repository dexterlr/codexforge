param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2382 Provider Mock Result Quality Review Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-quality-review-preview.ps1"
  Domain = "provider-mock-result-quality-review-preview"
  Route = "provider-mock-result-quality-review-preview"
  CommandLabel = "Go to Provider Mock Result Quality Review Preview"
  RouteHref = "/provider-mock-result-quality-review-preview"
  Phase = 2382
  Title = "Provider Mock Result Quality Review Preview"
  Markers = @(
  'Provider mock result quality review preview',
  'Provider mock result quality review preview defines review criteria for synthetic mock outputs without accepting real model results',
  'Provider mock result quality review preview keeps output quality gates backend-owned and approval-gated',
  'Provider mock result quality review preview blocks output persistence',
  'Denied provider mock result quality review paths remain blocked',
  'Provider mock result quality review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
