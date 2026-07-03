param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2399 Provider Mock Result Fixture Safety Guard"
  ScriptFile = "smoke-codexforge-provider-mock-result-fixture-safety-guard.ps1"
  Domain = "provider-mock-result-fixture-safety-guard"
  Route = "provider-mock-result-fixture-safety-guard"
  CommandLabel = "Go to Provider Mock Result Fixture Safety Guard"
  RouteHref = "/provider-mock-result-fixture-safety-guard"
  Phase = 2399
  Title = "Provider Mock Result Fixture Safety Guard"
  Markers = @(
  'Provider mock result fixture safety guard',
  'Provider mock result fixture safety guard verifies mock result fixtures remain synthetic with no real prompts credentials tokens outputs provider payloads or user secrets',
  'Provider mock result fixture safety guard preserves dry run harness provider adapter contract and gateway boundaries',
  'Provider mock result fixture safety guard blocks real data capture',
  'Denied provider mock result fixture safety paths remain blocked',
  'Provider mock result fixture safety checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
