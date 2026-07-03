param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2474 Provider Backend Execution Readiness Map"
  ScriptFile = "smoke-codexforge-provider-backend-execution-readiness-map.ps1"
  Domain = "provider-backend-execution-readiness-map"
  Route = "provider-backend-execution-readiness-map"
  CommandLabel = "Go to Provider Backend Execution Readiness Map"
  RouteHref = "/provider-backend-execution-readiness-map"
  Phase = 2474
  Title = "Provider Backend Execution Readiness Map"
  Markers = @(
  'Provider backend execution readiness map'
  'Provider backend execution readiness map defines backend prerequisites before any future real provider call without implementing live provider execution'
  'Provider backend execution readiness map does not call providers call models send prompts stream responses store credentials store tokens persist outputs create services or create APIs'
  'Provider backend execution readiness map keeps provider execution blocked pending first real provider call guard'
  'Denied provider backend execution readiness paths remain blocked'
  'Provider backend execution readiness checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
