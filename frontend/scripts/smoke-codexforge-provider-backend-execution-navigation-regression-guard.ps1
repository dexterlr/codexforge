param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2504 Provider Backend Execution Navigation Regression Guard"
  ScriptFile = "smoke-codexforge-provider-backend-execution-navigation-regression-guard.ps1"
  Domain = "provider-backend-execution-navigation-regression-guard"
  Route = "provider-backend-execution-navigation-regression-guard"
  CommandLabel = "Go to Provider Backend Execution Navigation Regression Guard"
  RouteHref = "/provider-backend-execution-navigation-regression-guard"
  Phase = 2504
  Title = "Provider Backend Execution Navigation Regression Guard"
  Markers = @(
  'Provider backend execution navigation regression guard'
  'Provider backend execution navigation regression guard verifies provider backend execution routes are registered without duplicate hrefs invalid route hrefs invalid navigation groups invalid safety posture values invalid commandDeckRole values or broken cockpit links'
  'Provider backend execution navigation regression guard preserves controlled dry run approval audit mock result dry run provider adapter and Jarvis navigation coverage'
  'Provider backend execution navigation regression guard keeps diagnostics review-only'
  'Denied provider backend execution navigation regression paths remain blocked'
  'Provider backend execution navigation regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
