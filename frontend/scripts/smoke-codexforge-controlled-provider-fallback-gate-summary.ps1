param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2457 Controlled Provider Fallback Gate Summary"
  ScriptFile = "smoke-codexforge-controlled-provider-fallback-gate-summary.ps1"
  Domain = "controlled-provider-fallback-gate-summary"
  Route = "controlled-provider-fallback-gate-summary"
  CommandLabel = "Go to Controlled Provider Fallback Gate Summary"
  RouteHref = "/controlled-provider-fallback-gate-summary"
  Phase = 2457
  Title = "Controlled Provider Fallback Gate Summary"
  Markers = @(
  'Controlled provider fallback gate summary'
  'Controlled provider fallback gate summary defines fallback gates for future provider trials without routing prompts or calling fallback providers'
  'Controlled provider fallback gate summary keeps fallback selection backend-owned and approval-gated'
  'Controlled provider fallback gate summary blocks live fallback execution'
  'Denied controlled provider fallback gate paths remain blocked'
  'Controlled provider fallback gate checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
