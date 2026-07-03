param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2461 Controlled Provider Dry Run Cockpit Readiness Rail"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-cockpit-readiness-rail.ps1"
  Domain = "controlled-provider-dry-run-cockpit-readiness-rail"
  Route = "controlled-provider-dry-run-cockpit-readiness-rail"
  CommandLabel = "Go to Controlled Provider Dry Run Cockpit Readiness Rail"
  RouteHref = "/controlled-provider-dry-run-cockpit-readiness-rail"
  Phase = 2461
  Title = "Controlled Provider Dry Run Cockpit Readiness Rail"
  Markers = @(
  'Controlled provider dry run cockpit readiness rail'
  'Controlled provider dry run cockpit readiness rail shows cockpit readiness for controlled provider dry run candidate without executing providers'
  'Controlled provider dry run cockpit readiness rail uses deterministic synthetic data only and disabled actions'
  'Controlled provider dry run cockpit readiness rail keeps provider execution blocked'
  'Denied controlled provider cockpit readiness paths remain blocked'
  'Controlled provider cockpit readiness checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
