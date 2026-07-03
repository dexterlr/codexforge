param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2458 Controlled Provider Redaction Gate Summary"
  ScriptFile = "smoke-codexforge-controlled-provider-redaction-gate-summary.ps1"
  Domain = "controlled-provider-redaction-gate-summary"
  Route = "controlled-provider-redaction-gate-summary"
  CommandLabel = "Go to Controlled Provider Redaction Gate Summary"
  RouteHref = "/controlled-provider-redaction-gate-summary"
  Phase = 2458
  Title = "Controlled Provider Redaction Gate Summary"
  Markers = @(
  'Controlled provider redaction gate summary'
  'Controlled provider redaction gate summary defines redaction gates without inspecting real prompts or transmitting data'
  'Controlled provider redaction gate summary keeps sensitive prompt credential token and output fields out of review surfaces'
  'Controlled provider redaction gate summary blocks secret leakage'
  'Denied controlled provider redaction gate paths remain blocked'
  'Controlled provider redaction gate checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
