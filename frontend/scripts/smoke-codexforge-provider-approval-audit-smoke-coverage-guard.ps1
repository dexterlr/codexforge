param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2438 Provider Approval Audit Smoke Coverage Guard"
  ScriptFile = "smoke-codexforge-provider-approval-audit-smoke-coverage-guard.ps1"
  Domain = "provider-approval-audit-smoke-coverage-guard"
  Route = "provider-approval-audit-smoke-coverage-guard"
  CommandLabel = "Go to Provider Approval Audit Smoke Coverage Guard"
  RouteHref = "/provider-approval-audit-smoke-coverage-guard"
  Phase = 2438
  Title = "Provider Approval Audit Smoke Coverage Guard"
  Markers = @(
  'Provider approval audit smoke coverage guard'
  'Provider approval audit smoke coverage guard verifies provider approval audit batch has targeted smoke scripts and all-smoke registration without removing previous coverage'
  'Provider approval audit smoke coverage guard keeps smoke scanning scoped to provider approval audit batch-owned files to avoid old helper false positives'
  'Provider approval audit smoke coverage guard preserves checkpoint smoke coverage'
  'Denied provider approval audit smoke coverage regression paths remain blocked'
  'Provider approval audit smoke coverage checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
