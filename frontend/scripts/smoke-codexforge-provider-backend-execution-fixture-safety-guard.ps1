param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2499 Provider Backend Execution Fixture Safety Guard"
  ScriptFile = "smoke-codexforge-provider-backend-execution-fixture-safety-guard.ps1"
  Domain = "provider-backend-execution-fixture-safety-guard"
  Route = "provider-backend-execution-fixture-safety-guard"
  CommandLabel = "Go to Provider Backend Execution Fixture Safety Guard"
  RouteHref = "/provider-backend-execution-fixture-safety-guard"
  Phase = 2499
  Title = "Provider Backend Execution Fixture Safety Guard"
  Markers = @(
  'Provider backend execution fixture safety guard'
  'Provider backend execution fixture safety guard verifies readiness fixtures remain synthetic with no real prompts credentials tokens outputs provider payloads or user secrets'
  'Provider backend execution fixture safety guard preserves controlled dry run approval audit mock result dry run provider adapter and gateway boundaries'
  'Provider backend execution fixture safety guard blocks real data capture'
  'Denied provider backend execution fixture safety paths remain blocked'
  'Provider backend execution fixture safety checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
