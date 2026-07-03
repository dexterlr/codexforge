param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2372 Provider Dry Run Navigation Regression Guard"
  ScriptFile = "smoke-codexforge-provider-dry-run-navigation-regression-guard.ps1"
  Domain = "provider-dry-run-navigation-regression-guard"
  Route = "provider-dry-run-navigation-regression-guard"
  CommandLabel = "Go to Provider Dry Run Navigation Regression Guard"
  RouteHref = "/provider-dry-run-navigation-regression-guard"
  Phase = 2372
  Title = "Provider Dry Run Navigation Regression Guard"
  Markers = @(
  'Provider dry run navigation regression guard',
  'Provider dry run navigation regression guard verifies provider dry run routes are registered without duplicate hrefs invalid route hrefs invalid navigation groups invalid safety posture values invalid commandDeckRole values or broken cockpit links',
  'Provider dry run navigation regression guard preserves provider gateway backend adapter and Jarvis navigation coverage',
  'Provider dry run navigation regression guard keeps dry run diagnostics review-only',
  'Denied provider dry run navigation regression paths remain blocked',
  'Provider dry run navigation regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

