param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2426 Disabled Provider Approval Execution Lane"
  ScriptFile = "smoke-codexforge-disabled-provider-approval-execution-lane.ps1"
  Domain = "disabled-provider-approval-execution-lane"
  Route = "disabled-provider-approval-execution-lane"
  CommandLabel = "Go to Disabled Provider Approval Execution Lane"
  RouteHref = "/disabled-provider-approval-execution-lane"
  Phase = 2426
  Title = "Disabled Provider Approval Execution Lane"
  Markers = @(
  'Disabled provider approval execution lane'
  'Disabled provider approval execution lane shows approval execution states without importing SDKs creating clients or calling providers'
  'Disabled provider approval execution lane keeps all approval execution actions disabled pending controlled dry run candidate'
  'Disabled provider approval execution lane blocks live execution'
  'Denied disabled provider approval execution paths remain blocked'
  'Disabled provider approval execution lane checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
