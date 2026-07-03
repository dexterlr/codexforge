param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2470 Controlled Provider Dry Run Navigation Regression Guard"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-navigation-regression-guard.ps1"
  Domain = "controlled-provider-dry-run-navigation-regression-guard"
  Route = "controlled-provider-dry-run-navigation-regression-guard"
  CommandLabel = "Go to Controlled Provider Dry Run Navigation Regression Guard"
  RouteHref = "/controlled-provider-dry-run-navigation-regression-guard"
  Phase = 2470
  Title = "Controlled Provider Dry Run Navigation Regression Guard"
  Markers = @(
  'Controlled provider dry run navigation regression guard'
  'Controlled provider dry run navigation regression guard verifies controlled provider dry run routes are registered without duplicate hrefs invalid route hrefs invalid navigation groups invalid safety posture values invalid commandDeckRole values or broken cockpit links'
  'Controlled provider dry run navigation regression guard preserves approval audit mock result dry run provider adapter and Jarvis navigation coverage'
  'Controlled provider dry run navigation regression guard keeps diagnostics review-only'
  'Denied controlled provider navigation regression paths remain blocked'
  'Controlled provider navigation regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
