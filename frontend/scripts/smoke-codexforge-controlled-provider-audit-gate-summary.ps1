param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2459 Controlled Provider Audit Gate Summary"
  ScriptFile = "smoke-codexforge-controlled-provider-audit-gate-summary.ps1"
  Domain = "controlled-provider-audit-gate-summary"
  Route = "controlled-provider-audit-gate-summary"
  CommandLabel = "Go to Controlled Provider Audit Gate Summary"
  RouteHref = "/controlled-provider-audit-gate-summary"
  Phase = 2459
  Title = "Controlled Provider Audit Gate Summary"
  Markers = @(
  'Controlled provider audit gate summary'
  'Controlled provider audit gate summary defines audit gates without writing immutable logs or external telemetry'
  'Controlled provider audit gate summary keeps approval id audit id fixture id result id and denial state synthetic and review-only'
  'Controlled provider audit gate summary blocks unverifiable execution claims'
  'Denied controlled provider audit gate paths remain blocked'
  'Controlled provider audit gate checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
