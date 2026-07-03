param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2588 Provider Result Review Cockpit Readiness Rail"
  ScriptFile = "smoke-codexforge-provider-result-review-cockpit-readiness-rail.ps1"
  Domain = "provider-result-review-cockpit-readiness-rail"
  Route = "provider-result-review-cockpit-readiness-rail"
  CommandLabel = "Go to Provider Result Review Cockpit Readiness Rail"
  RouteHref = "/provider-result-review-cockpit-readiness-rail"
  Phase = 2588
  Title = "Provider Result Review Cockpit Readiness Rail"
  Markers = @(
  'Provider result review cockpit readiness rail'
  'Provider result review cockpit readiness rail shows cockpit readiness for result review and recovery without executing providers or processing real outputs'
  'Provider result review cockpit readiness rail uses deterministic synthetic data only and disabled actions'
  'Provider result review cockpit readiness rail keeps provider result promotion blocked'
  'Denied provider result cockpit readiness paths remain blocked'
  'Provider result cockpit readiness checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
