param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2454 Controlled Provider Cost Gate Summary"
  ScriptFile = "smoke-codexforge-controlled-provider-cost-gate-summary.ps1"
  Domain = "controlled-provider-cost-gate-summary"
  Route = "controlled-provider-cost-gate-summary"
  CommandLabel = "Go to Controlled Provider Cost Gate Summary"
  RouteHref = "/controlled-provider-cost-gate-summary"
  Phase = 2454
  Title = "Controlled Provider Cost Gate Summary"
  Markers = @(
  'Controlled provider cost gate summary'
  'Controlled provider cost gate summary defines cost gates for future provider trials without calling billing endpoints or providers'
  'Controlled provider cost gate summary keeps spend controls backend-owned and approval-gated'
  'Controlled provider cost gate summary blocks paid execution'
  'Denied controlled provider cost gate paths remain blocked'
  'Controlled provider cost gate checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
