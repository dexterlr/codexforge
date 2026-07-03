param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2436 Provider Approval Audit Safety Regression Guard"
  ScriptFile = "smoke-codexforge-provider-approval-audit-safety-regression-guard.ps1"
  Domain = "provider-approval-audit-safety-regression-guard"
  Route = "provider-approval-audit-safety-regression-guard"
  CommandLabel = "Go to Provider Approval Audit Safety Regression Guard"
  RouteHref = "/provider-approval-audit-safety-regression-guard"
  Phase = 2436
  Title = "Provider Approval Audit Safety Regression Guard"
  Markers = @(
  'Provider approval audit safety regression guard'
  'Provider approval audit safety regression guard verifies provider approval audit enforcement remains review-only with no provider calls no model calls no prompt sending no credential storage no token storage no streaming no hidden execution and no SDK clients'
  'Provider approval audit safety regression guard preserves provider mock result dry run provider adapter and gateway boundaries'
  'Provider approval audit safety regression guard blocks hidden execution affordances'
  'Denied provider approval audit safety regression paths remain blocked'
  'Provider approval audit safety regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
