param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2389 Provider Mock Result Cost Review Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-cost-review-preview.ps1"
  Domain = "provider-mock-result-cost-review-preview"
  Route = "provider-mock-result-cost-review-preview"
  CommandLabel = "Go to Provider Mock Result Cost Review Preview"
  RouteHref = "/provider-mock-result-cost-review-preview"
  Phase = 2389
  Title = "Provider Mock Result Cost Review Preview"
  Markers = @(
  'Provider mock result cost review preview',
  'Provider mock result cost review preview defines synthetic cost review metadata without calling billing endpoints or providers',
  'Provider mock result cost review preview keeps spend controls backend-owned',
  'Provider mock result cost review preview blocks paid execution',
  'Denied provider mock result cost review paths remain blocked',
  'Provider mock result cost review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
