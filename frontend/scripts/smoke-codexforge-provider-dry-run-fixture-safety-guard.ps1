param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2367 Provider Dry Run Fixture Safety Guard"
  ScriptFile = "smoke-codexforge-provider-dry-run-fixture-safety-guard.ps1"
  Domain = "provider-dry-run-fixture-safety-guard"
  Route = "provider-dry-run-fixture-safety-guard"
  CommandLabel = "Go to Provider Dry Run Fixture Safety Guard"
  RouteHref = "/provider-dry-run-fixture-safety-guard"
  Phase = 2367
  Title = "Provider Dry Run Fixture Safety Guard"
  Markers = @(
  'Provider dry run fixture safety guard',
  'Provider dry run fixture safety guard verifies fixtures remain synthetic with no real prompts credentials tokens outputs provider payloads or user secrets',
  'Provider dry run fixture safety guard preserves provider adapter contract and gateway boundaries',
  'Provider dry run fixture safety guard blocks real data capture',
  'Denied provider dry run fixture safety paths remain blocked',
  'Provider dry run fixture safety checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

