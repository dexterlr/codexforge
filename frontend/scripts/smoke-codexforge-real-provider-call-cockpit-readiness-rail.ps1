param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2527 Real Provider Call Cockpit Readiness Rail"
  ScriptFile = "smoke-codexforge-real-provider-call-cockpit-readiness-rail.ps1"
  Domain = "real-provider-call-cockpit-readiness-rail"
  Route = "real-provider-call-cockpit-readiness-rail"
  CommandLabel = "Go to Real Provider Call Cockpit Readiness Rail"
  RouteHref = "/real-provider-call-cockpit-readiness-rail"
  Phase = 2527
  Title = "Real Provider Call Cockpit Readiness Rail"
  Markers = @(
  'Real provider call cockpit readiness rail'
  'Real provider call cockpit readiness rail shows cockpit readiness for first real provider call guard without executing providers'
  'Real provider call cockpit readiness rail uses deterministic synthetic data only and disabled actions'
  'Real provider call cockpit readiness rail keeps provider execution blocked'
  'Denied real provider cockpit readiness paths remain blocked'
  'Real provider cockpit readiness checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
