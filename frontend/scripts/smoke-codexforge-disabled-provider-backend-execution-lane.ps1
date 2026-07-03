param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2494 Disabled Provider Backend Execution Lane"
  ScriptFile = "smoke-codexforge-disabled-provider-backend-execution-lane.ps1"
  Domain = "disabled-provider-backend-execution-lane"
  Route = "disabled-provider-backend-execution-lane"
  CommandLabel = "Go to Disabled Provider Backend Execution Lane"
  RouteHref = "/disabled-provider-backend-execution-lane"
  Phase = 2494
  Title = "Disabled Provider Backend Execution Lane"
  Markers = @(
  'Disabled provider backend execution lane'
  'Disabled provider backend execution lane shows backend execution states without importing SDKs creating clients or calling providers'
  'Disabled provider backend execution lane keeps all execution actions disabled pending first real provider call guard'
  'Disabled provider backend execution lane blocks live execution'
  'Denied disabled provider backend execution paths remain blocked'
  'Disabled provider backend execution lane checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
