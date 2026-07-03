param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2562 Approved Provider Trial Fixture Safety Guard"
  ScriptFile = "smoke-codexforge-approved-provider-trial-fixture-safety-guard.ps1"
  Domain = "approved-provider-trial-fixture-safety-guard"
  Route = "approved-provider-trial-fixture-safety-guard"
  CommandLabel = "Go to Approved Provider Trial Fixture Safety Guard"
  RouteHref = "/approved-provider-trial-fixture-safety-guard"
  Phase = 2562
  Title = "Approved Provider Trial Fixture Safety Guard"
  Markers = @(
  'Approved provider trial fixture safety guard'
  'Approved provider trial fixture safety guard verifies approved trial fixtures remain synthetic with no real prompts credentials tokens outputs provider payloads or user secrets'
  'Approved provider trial fixture safety guard preserves first real provider call guard backend execution controlled dry run approval audit mock result dry run provider adapter and gateway boundaries'
  'Approved provider trial fixture safety guard blocks real data capture'
  'Denied approved provider fixture safety paths remain blocked'
  'Approved provider fixture safety checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
