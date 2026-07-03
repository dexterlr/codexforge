param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2404 Provider Mock Result Navigation Regression Guard"
  ScriptFile = "smoke-codexforge-provider-mock-result-navigation-regression-guard.ps1"
  Domain = "provider-mock-result-navigation-regression-guard"
  Route = "provider-mock-result-navigation-regression-guard"
  CommandLabel = "Go to Provider Mock Result Navigation Regression Guard"
  RouteHref = "/provider-mock-result-navigation-regression-guard"
  Phase = 2404
  Title = "Provider Mock Result Navigation Regression Guard"
  Markers = @(
  'Provider mock result navigation regression guard',
  'Provider mock result navigation regression guard verifies provider mock result routes are registered without duplicate hrefs invalid route hrefs invalid navigation groups invalid safety posture values invalid commandDeckRole values or broken cockpit links',
  'Provider mock result navigation regression guard preserves provider dry run provider adapter and Jarvis navigation coverage',
  'Provider mock result navigation regression guard keeps mock result diagnostics review-only',
  'Denied provider mock result navigation regression paths remain blocked',
  'Provider mock result navigation regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
