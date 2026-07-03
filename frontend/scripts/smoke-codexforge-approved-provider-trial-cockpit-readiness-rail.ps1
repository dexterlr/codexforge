param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2558 Approved Provider Trial Cockpit Readiness Rail"
  ScriptFile = "smoke-codexforge-approved-provider-trial-cockpit-readiness-rail.ps1"
  Domain = "approved-provider-trial-cockpit-readiness-rail"
  Route = "approved-provider-trial-cockpit-readiness-rail"
  CommandLabel = "Go to Approved Provider Trial Cockpit Readiness Rail"
  RouteHref = "/approved-provider-trial-cockpit-readiness-rail"
  Phase = 2558
  Title = "Approved Provider Trial Cockpit Readiness Rail"
  Markers = @(
  'Approved provider trial cockpit readiness rail'
  'Approved provider trial cockpit readiness rail shows cockpit readiness for first approved provider trial without executing providers'
  'Approved provider trial cockpit readiness rail uses deterministic synthetic data only and disabled actions'
  'Approved provider trial cockpit readiness rail keeps provider execution blocked'
  'Denied approved provider cockpit readiness paths remain blocked'
  'Approved provider cockpit readiness checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
