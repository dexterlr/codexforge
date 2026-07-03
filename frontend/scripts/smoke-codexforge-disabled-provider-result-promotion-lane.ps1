param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2587 Disabled Provider Result Promotion Lane"
  ScriptFile = "smoke-codexforge-disabled-provider-result-promotion-lane.ps1"
  Domain = "disabled-provider-result-promotion-lane"
  Route = "disabled-provider-result-promotion-lane"
  CommandLabel = "Go to Disabled Provider Result Promotion Lane"
  RouteHref = "/disabled-provider-result-promotion-lane"
  Phase = 2587
  Title = "Disabled Provider Result Promotion Lane"
  Markers = @(
  'Disabled provider result promotion lane'
  'Disabled provider result promotion lane shows result promotion states without persisting results exporting publishing or calling providers'
  'Disabled provider result promotion lane keeps all promotion actions disabled pending provider gateway hardening'
  'Disabled provider result promotion lane blocks live promotion'
  'Denied disabled provider result promotion paths remain blocked'
  'Disabled provider result promotion lane checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
