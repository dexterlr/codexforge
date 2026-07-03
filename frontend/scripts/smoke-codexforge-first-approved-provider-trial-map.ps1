param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2538 First Approved Provider Trial Map"
  ScriptFile = "smoke-codexforge-first-approved-provider-trial-map.ps1"
  Domain = "first-approved-provider-trial-map"
  Route = "first-approved-provider-trial-map"
  CommandLabel = "Go to First Approved Provider Trial Map"
  RouteHref = "/first-approved-provider-trial-map"
  Phase = 2538
  Title = "First Approved Provider Trial Map"
  Markers = @(
  'First approved provider trial map'
  'First approved provider trial map assembles approval audit backend execution and real provider call guard prerequisites without implementing live provider execution'
  'First approved provider trial map does not call providers call models send prompts stream responses store credentials store tokens persist outputs create services or create APIs'
  'First approved provider trial map keeps provider execution blocked pending result review and recovery hardening'
  'Denied approved provider trial paths remain blocked'
  'First approved provider trial checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
