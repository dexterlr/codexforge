param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2460 Disabled Controlled Provider Execution Lane"
  ScriptFile = "smoke-codexforge-disabled-controlled-provider-execution-lane.ps1"
  Domain = "disabled-controlled-provider-execution-lane"
  Route = "disabled-controlled-provider-execution-lane"
  CommandLabel = "Go to Disabled Controlled Provider Execution Lane"
  RouteHref = "/disabled-controlled-provider-execution-lane"
  Phase = 2460
  Title = "Disabled Controlled Provider Execution Lane"
  Markers = @(
  'Disabled controlled provider execution lane'
  'Disabled controlled provider execution lane shows controlled provider execution states without importing SDKs creating clients or calling providers'
  'Disabled controlled provider execution lane keeps all provider execution actions disabled pending backend execution readiness'
  'Disabled controlled provider execution lane blocks live execution'
  'Denied disabled controlled provider execution paths remain blocked'
  'Disabled controlled provider execution lane checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
