param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2432 Provider Approval Audit Fixture Safety Guard"
  ScriptFile = "smoke-codexforge-provider-approval-audit-fixture-safety-guard.ps1"
  Domain = "provider-approval-audit-fixture-safety-guard"
  Route = "provider-approval-audit-fixture-safety-guard"
  CommandLabel = "Go to Provider Approval Audit Fixture Safety Guard"
  RouteHref = "/provider-approval-audit-fixture-safety-guard"
  Phase = 2432
  Title = "Provider Approval Audit Fixture Safety Guard"
  Markers = @(
  'Provider approval audit fixture safety guard'
  'Provider approval audit fixture safety guard verifies approval audit fixtures remain synthetic with no real prompts credentials tokens outputs provider payloads or user secrets'
  'Provider approval audit fixture safety guard preserves mock result dry run provider adapter and gateway boundaries'
  'Provider approval audit fixture safety guard blocks real data capture'
  'Denied provider approval audit fixture safety paths remain blocked'
  'Provider approval audit fixture safety checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
