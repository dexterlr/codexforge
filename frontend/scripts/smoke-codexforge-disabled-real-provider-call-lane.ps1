param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2526 Disabled Real Provider Call Lane"
  ScriptFile = "smoke-codexforge-disabled-real-provider-call-lane.ps1"
  Domain = "disabled-real-provider-call-lane"
  Route = "disabled-real-provider-call-lane"
  CommandLabel = "Go to Disabled Real Provider Call Lane"
  RouteHref = "/disabled-real-provider-call-lane"
  Phase = 2526
  Title = "Disabled Real Provider Call Lane"
  Markers = @(
  'Disabled real provider call lane'
  'Disabled real provider call lane shows real provider call states without importing SDKs creating clients sending prompts or calling providers'
  'Disabled real provider call lane keeps all real provider call actions disabled pending first approved provider trial'
  'Disabled real provider call lane blocks live execution'
  'Denied disabled real provider call paths remain blocked'
  'Disabled real provider call lane checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
