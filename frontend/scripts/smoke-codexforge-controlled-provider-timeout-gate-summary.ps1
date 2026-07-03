param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2456 Controlled Provider Timeout Gate Summary"
  ScriptFile = "smoke-codexforge-controlled-provider-timeout-gate-summary.ps1"
  Domain = "controlled-provider-timeout-gate-summary"
  Route = "controlled-provider-timeout-gate-summary"
  CommandLabel = "Go to Controlled Provider Timeout Gate Summary"
  RouteHref = "/controlled-provider-timeout-gate-summary"
  Phase = 2456
  Title = "Controlled Provider Timeout Gate Summary"
  Markers = @(
  'Controlled provider timeout gate summary'
  'Controlled provider timeout gate summary defines timeout gates for future provider trials without provider calls or scheduling live work'
  'Controlled provider timeout gate summary keeps timeout enforcement backend-owned and deterministic'
  'Controlled provider timeout gate summary blocks live timeout execution'
  'Denied controlled provider timeout gate paths remain blocked'
  'Controlled provider timeout gate checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
