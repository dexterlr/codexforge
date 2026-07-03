param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2394 Disabled Provider Mock Result Lane"
  ScriptFile = "smoke-codexforge-disabled-provider-mock-result-lane.ps1"
  Domain = "disabled-provider-mock-result-lane"
  Route = "disabled-provider-mock-result-lane"
  CommandLabel = "Go to Disabled Provider Mock Result Lane"
  RouteHref = "/disabled-provider-mock-result-lane"
  Phase = 2394
  Title = "Disabled Provider Mock Result Lane"
  Markers = @(
  'Disabled provider mock result lane',
  'Disabled provider mock result lane shows mock result lane states without importing SDKs creating clients or calling providers',
  'Disabled provider mock result lane keeps all mock result actions disabled pending future approval audit enforcement',
  'Disabled provider mock result lane blocks live execution',
  'Denied disabled provider mock result paths remain blocked',
  'Disabled provider mock result lane checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
