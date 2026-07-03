param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2390 Provider Mock Result Rate Review Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-rate-review-preview.ps1"
  Domain = "provider-mock-result-rate-review-preview"
  Route = "provider-mock-result-rate-review-preview"
  CommandLabel = "Go to Provider Mock Result Rate Review Preview"
  RouteHref = "/provider-mock-result-rate-review-preview"
  Phase = 2390
  Title = "Provider Mock Result Rate Review Preview"
  Markers = @(
  'Provider mock result rate review preview',
  'Provider mock result rate review preview defines synthetic rate review states without storing counters or sending provider traffic',
  'Provider mock result rate review preview keeps rate limits backend-owned and auditable',
  'Provider mock result rate review preview blocks live traffic',
  'Denied provider mock result rate review paths remain blocked',
  'Provider mock result rate review checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
