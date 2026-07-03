param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2378 Provider Mock Result Harness Map"
  ScriptFile = "smoke-codexforge-provider-mock-result-harness-map.ps1"
  Domain = "provider-mock-result-harness-map"
  Route = "provider-mock-result-harness-map"
  CommandLabel = "Go to Provider Mock Result Harness Map"
  RouteHref = "/provider-mock-result-harness-map"
  Phase = 2378
  Title = "Provider Mock Result Harness Map"
  Markers = @(
  'Provider mock result harness map',
  'Provider mock result harness map defines deterministic mock result boundaries without implementing live provider execution',
  'Provider mock result harness map does not call providers call models send prompts stream responses store credentials store tokens persist outputs create services or create APIs',
  'Provider mock result harness map keeps provider execution blocked pending approval audit enforcement',
  'Denied provider mock result harness paths remain blocked',
  'Provider mock result harness checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
