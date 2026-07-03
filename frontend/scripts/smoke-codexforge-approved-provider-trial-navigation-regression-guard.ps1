param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2567 Approved Provider Trial Navigation Regression Guard"
  ScriptFile = "smoke-codexforge-approved-provider-trial-navigation-regression-guard.ps1"
  Domain = "approved-provider-trial-navigation-regression-guard"
  Route = "approved-provider-trial-navigation-regression-guard"
  CommandLabel = "Go to Approved Provider Trial Navigation Regression Guard"
  RouteHref = "/approved-provider-trial-navigation-regression-guard"
  Phase = 2567
  Title = "Approved Provider Trial Navigation Regression Guard"
  Markers = @(
  'Approved provider trial navigation regression guard'
  'Approved provider trial navigation regression guard verifies approved provider trial routes are registered without duplicate hrefs invalid route hrefs invalid navigation groups invalid safety posture values invalid commandDeckRole values or broken cockpit links'
  'Approved provider trial navigation regression guard preserves first real provider call guard backend execution controlled dry run approval audit mock result dry run provider adapter and Jarvis navigation coverage'
  'Approved provider trial navigation regression guard keeps diagnostics review-only'
  'Denied approved provider navigation regression paths remain blocked'
  'Approved provider navigation regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
