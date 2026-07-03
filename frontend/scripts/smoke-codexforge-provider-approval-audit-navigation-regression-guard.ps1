param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2437 Provider Approval Audit Navigation Regression Guard"
  ScriptFile = "smoke-codexforge-provider-approval-audit-navigation-regression-guard.ps1"
  Domain = "provider-approval-audit-navigation-regression-guard"
  Route = "provider-approval-audit-navigation-regression-guard"
  CommandLabel = "Go to Provider Approval Audit Navigation Regression Guard"
  RouteHref = "/provider-approval-audit-navigation-regression-guard"
  Phase = 2437
  Title = "Provider Approval Audit Navigation Regression Guard"
  Markers = @(
  'Provider approval audit navigation regression guard'
  'Provider approval audit navigation regression guard verifies provider approval audit routes are registered without duplicate hrefs invalid route hrefs invalid navigation groups invalid safety posture values invalid commandDeckRole values or broken cockpit links'
  'Provider approval audit navigation regression guard preserves provider mock result dry run provider adapter and Jarvis navigation coverage'
  'Provider approval audit navigation regression guard keeps approval audit diagnostics review-only'
  'Denied provider approval audit navigation regression paths remain blocked'
  'Provider approval audit navigation regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
