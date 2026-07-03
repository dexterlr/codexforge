param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2453 Controlled Provider Privacy Gate Summary"
  ScriptFile = "smoke-codexforge-controlled-provider-privacy-gate-summary.ps1"
  Domain = "controlled-provider-privacy-gate-summary"
  Route = "controlled-provider-privacy-gate-summary"
  CommandLabel = "Go to Controlled Provider Privacy Gate Summary"
  RouteHref = "/controlled-provider-privacy-gate-summary"
  Phase = 2453
  Title = "Controlled Provider Privacy Gate Summary"
  Markers = @(
  'Controlled provider privacy gate summary'
  'Controlled provider privacy gate summary defines privacy gates for future provider trials without transmitting data or inspecting real user secrets'
  'Controlled provider privacy gate summary keeps privacy class redaction and prompt boundary visible'
  'Controlled provider privacy gate summary blocks prompt leakage'
  'Denied controlled provider privacy gate paths remain blocked'
  'Controlled provider privacy gate checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
