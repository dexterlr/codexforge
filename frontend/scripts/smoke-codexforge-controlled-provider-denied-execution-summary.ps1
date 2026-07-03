param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2450 Controlled Provider Denied Execution Summary"
  ScriptFile = "smoke-codexforge-controlled-provider-denied-execution-summary.ps1"
  Domain = "controlled-provider-denied-execution-summary"
  Route = "controlled-provider-denied-execution-summary"
  CommandLabel = "Go to Controlled Provider Denied Execution Summary"
  RouteHref = "/controlled-provider-denied-execution-summary"
  Phase = 2450
  Title = "Controlled Provider Denied Execution Summary"
  Markers = @(
  'Controlled provider denied execution summary'
  'Controlled provider denied execution summary lists denied actions for provider calls model calls prompt sending streaming credential storage token storage persistence queue dispatch workers route handlers services SDK clients and connector calls'
  'Controlled provider denied execution summary keeps protected actions blocked by default'
  'Controlled provider denied execution summary exposes no execution affordance'
  'Denied controlled provider execution summary paths remain blocked'
  'Controlled provider denied execution checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
