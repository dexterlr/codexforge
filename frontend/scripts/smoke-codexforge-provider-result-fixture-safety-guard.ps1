param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2592 Provider Result Fixture Safety Guard"
  ScriptFile = "smoke-codexforge-provider-result-fixture-safety-guard.ps1"
  Domain = "provider-result-fixture-safety-guard"
  Route = "provider-result-fixture-safety-guard"
  CommandLabel = "Go to Provider Result Fixture Safety Guard"
  RouteHref = "/provider-result-fixture-safety-guard"
  Phase = 2592
  Title = "Provider Result Fixture Safety Guard"
  Markers = @(
  'Provider result fixture safety guard'
  'Provider result fixture safety guard verifies result review fixtures remain synthetic with no real prompts credentials tokens outputs provider payloads or user secrets'
  'Provider result fixture safety guard preserves approved trial first real provider call guard backend execution controlled dry run approval audit mock result dry run provider adapter and gateway boundaries'
  'Provider result fixture safety guard blocks real data capture'
  'Denied provider result fixture safety paths remain blocked'
  'Provider result fixture safety checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
