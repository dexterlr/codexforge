param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2395 Provider Mock Result Cockpit Readiness Rail"
  ScriptFile = "smoke-codexforge-provider-mock-result-cockpit-readiness-rail.ps1"
  Domain = "provider-mock-result-cockpit-readiness-rail"
  Route = "provider-mock-result-cockpit-readiness-rail"
  CommandLabel = "Go to Provider Mock Result Cockpit Readiness Rail"
  RouteHref = "/provider-mock-result-cockpit-readiness-rail"
  Phase = 2395
  Title = "Provider Mock Result Cockpit Readiness Rail"
  Markers = @(
  'Provider mock result cockpit readiness rail',
  'Provider mock result cockpit readiness rail shows cockpit readiness for mock result harness without executing providers',
  'Provider mock result cockpit readiness rail uses deterministic synthetic data only and disabled actions',
  'Provider mock result cockpit readiness rail keeps provider execution blocked',
  'Denied provider mock result cockpit readiness paths remain blocked',
  'Provider mock result cockpit readiness checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
