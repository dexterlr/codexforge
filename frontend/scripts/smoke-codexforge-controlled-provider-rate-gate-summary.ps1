param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2455 Controlled Provider Rate Gate Summary"
  ScriptFile = "smoke-codexforge-controlled-provider-rate-gate-summary.ps1"
  Domain = "controlled-provider-rate-gate-summary"
  Route = "controlled-provider-rate-gate-summary"
  CommandLabel = "Go to Controlled Provider Rate Gate Summary"
  RouteHref = "/controlled-provider-rate-gate-summary"
  Phase = 2455
  Title = "Controlled Provider Rate Gate Summary"
  Markers = @(
  'Controlled provider rate gate summary'
  'Controlled provider rate gate summary defines rate gates for future provider trials without storing counters or sending provider traffic'
  'Controlled provider rate gate summary keeps rate limits backend-owned and auditable'
  'Controlled provider rate gate summary blocks live traffic'
  'Denied controlled provider rate gate paths remain blocked'
  'Controlled provider rate gate checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
