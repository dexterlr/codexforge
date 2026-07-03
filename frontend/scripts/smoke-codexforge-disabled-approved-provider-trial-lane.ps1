param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2557 Disabled Approved Provider Trial Lane"
  ScriptFile = "smoke-codexforge-disabled-approved-provider-trial-lane.ps1"
  Domain = "disabled-approved-provider-trial-lane"
  Route = "disabled-approved-provider-trial-lane"
  CommandLabel = "Go to Disabled Approved Provider Trial Lane"
  RouteHref = "/disabled-approved-provider-trial-lane"
  Phase = 2557
  Title = "Disabled Approved Provider Trial Lane"
  Markers = @(
  'Disabled approved provider trial lane'
  'Disabled approved provider trial lane shows approved provider trial states without importing SDKs creating clients sending prompts or calling providers'
  'Disabled approved provider trial lane keeps all approved trial actions disabled pending result review and recovery hardening'
  'Disabled approved provider trial lane blocks live execution'
  'Denied disabled approved provider trial paths remain blocked'
  'Disabled approved provider trial lane checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
