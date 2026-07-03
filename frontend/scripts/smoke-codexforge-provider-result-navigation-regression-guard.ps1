param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2599 Provider Result Navigation Regression Guard"
  ScriptFile = "smoke-codexforge-provider-result-navigation-regression-guard.ps1"
  Domain = "provider-result-navigation-regression-guard"
  Route = "provider-result-navigation-regression-guard"
  CommandLabel = "Go to Provider Result Navigation Regression Guard"
  RouteHref = "/provider-result-navigation-regression-guard"
  Phase = 2599
  Title = "Provider Result Navigation Regression Guard"
  Markers = @(
  'Provider result navigation regression guard'
  'Provider result navigation regression guard verifies provider result review routes are registered without duplicate hrefs invalid route hrefs invalid navigation groups invalid safety posture values invalid commandDeckRole values or broken cockpit links'
  'Provider result navigation regression guard preserves approved trial first real provider call guard backend execution controlled dry run provider adapter and Jarvis navigation coverage'
  'Provider result navigation regression guard keeps diagnostics review-only'
  'Denied provider result navigation regression paths remain blocked'
  'Provider result navigation regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
