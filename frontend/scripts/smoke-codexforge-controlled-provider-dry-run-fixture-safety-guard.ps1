param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2465 Controlled Provider Dry Run Fixture Safety Guard"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-fixture-safety-guard.ps1"
  Domain = "controlled-provider-dry-run-fixture-safety-guard"
  Route = "controlled-provider-dry-run-fixture-safety-guard"
  CommandLabel = "Go to Controlled Provider Dry Run Fixture Safety Guard"
  RouteHref = "/controlled-provider-dry-run-fixture-safety-guard"
  Phase = 2465
  Title = "Controlled Provider Dry Run Fixture Safety Guard"
  Markers = @(
  'Controlled provider dry run fixture safety guard'
  'Controlled provider dry run fixture safety guard verifies controlled dry run fixtures remain synthetic with no real prompts credentials tokens outputs provider payloads or user secrets'
  'Controlled provider dry run fixture safety guard preserves approval audit mock result dry run provider adapter and gateway boundaries'
  'Controlled provider dry run fixture safety guard blocks real data capture'
  'Denied controlled provider fixture safety paths remain blocked'
  'Controlled provider fixture safety checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
