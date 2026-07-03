param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2536 Real Provider Call Navigation Regression Guard"
  ScriptFile = "smoke-codexforge-real-provider-call-navigation-regression-guard.ps1"
  Domain = "real-provider-call-navigation-regression-guard"
  Route = "real-provider-call-navigation-regression-guard"
  CommandLabel = "Go to Real Provider Call Navigation Regression Guard"
  RouteHref = "/real-provider-call-navigation-regression-guard"
  Phase = 2536
  Title = "Real Provider Call Navigation Regression Guard"
  Markers = @(
  'Real provider call navigation regression guard'
  'Real provider call navigation regression guard verifies real provider call guard routes are registered without duplicate hrefs invalid route hrefs invalid navigation groups invalid safety posture values invalid commandDeckRole values or broken cockpit links'
  'Real provider call navigation regression guard preserves backend execution controlled dry run approval audit mock result dry run provider adapter and Jarvis navigation coverage'
  'Real provider call navigation regression guard keeps diagnostics review-only'
  'Denied real provider navigation regression paths remain blocked'
  'Real provider navigation regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
