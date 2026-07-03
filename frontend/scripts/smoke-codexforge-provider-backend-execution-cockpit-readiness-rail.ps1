param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2495 Provider Backend Execution Cockpit Readiness Rail"
  ScriptFile = "smoke-codexforge-provider-backend-execution-cockpit-readiness-rail.ps1"
  Domain = "provider-backend-execution-cockpit-readiness-rail"
  Route = "provider-backend-execution-cockpit-readiness-rail"
  CommandLabel = "Go to Provider Backend Execution Cockpit Readiness Rail"
  RouteHref = "/provider-backend-execution-cockpit-readiness-rail"
  Phase = 2495
  Title = "Provider Backend Execution Cockpit Readiness Rail"
  Markers = @(
  'Provider backend execution cockpit readiness rail'
  'Provider backend execution cockpit readiness rail shows cockpit readiness for backend execution prerequisites without executing providers'
  'Provider backend execution cockpit readiness rail uses deterministic synthetic data only and disabled actions'
  'Provider backend execution cockpit readiness rail keeps provider execution blocked'
  'Denied provider backend execution cockpit paths remain blocked'
  'Provider backend execution cockpit checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
