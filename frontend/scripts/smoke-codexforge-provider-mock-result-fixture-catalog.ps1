param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2380 Provider Mock Result Fixture Catalog"
  ScriptFile = "smoke-codexforge-provider-mock-result-fixture-catalog.ps1"
  Domain = "provider-mock-result-fixture-catalog"
  Route = "provider-mock-result-fixture-catalog"
  CommandLabel = "Go to Provider Mock Result Fixture Catalog"
  RouteHref = "/provider-mock-result-fixture-catalog"
  Phase = 2380
  Title = "Provider Mock Result Fixture Catalog"
  Markers = @(
  'Provider mock result fixture catalog',
  'Provider mock result fixture catalog lists deterministic synthetic mock outputs without storing real prompts credentials tokens provider data or user secrets',
  'Provider mock result fixture catalog keeps fixtures safe review-only and local-state only',
  'Provider mock result fixture catalog blocks real data capture',
  'Denied provider mock result fixture paths remain blocked',
  'Provider mock result fixture catalog checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
