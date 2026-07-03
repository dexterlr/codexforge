param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2396 Provider Mock Result State Preview"
  ScriptFile = "smoke-codexforge-provider-mock-result-state-preview.ps1"
  Domain = "provider-mock-result-state-preview"
  Route = "provider-mock-result-state-preview"
  CommandLabel = "Go to Provider Mock Result State Preview"
  RouteHref = "/provider-mock-result-state-preview"
  Phase = 2396
  Title = "Provider Mock Result State Preview"
  Markers = @(
  'Provider mock result state preview',
  'Provider mock result state preview defines synthetic mock result states without starting jobs queues workers services or route handlers',
  'Provider mock result state preview keeps state local deterministic and review-only',
  'Provider mock result state preview blocks dispatch',
  'Denied provider mock result state paths remain blocked',
  'Provider mock result state checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
