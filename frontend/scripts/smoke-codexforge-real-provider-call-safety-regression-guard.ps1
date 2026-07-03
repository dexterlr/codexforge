param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2535 Real Provider Call Safety Regression Guard"
  ScriptFile = "smoke-codexforge-real-provider-call-safety-regression-guard.ps1"
  Domain = "real-provider-call-safety-regression-guard"
  Route = "real-provider-call-safety-regression-guard"
  CommandLabel = "Go to Real Provider Call Safety Regression Guard"
  RouteHref = "/real-provider-call-safety-regression-guard"
  Phase = 2535
  Title = "Real Provider Call Safety Regression Guard"
  Markers = @(
  'Real provider call safety regression guard'
  'Real provider call safety regression guard verifies first real provider call guard remains review-only with no provider calls no model calls no prompt sending no credential storage no token storage no streaming no hidden execution and no SDK clients'
  'Real provider call safety regression guard preserves backend execution controlled dry run approval audit mock result dry run provider adapter and gateway boundaries'
  'Real provider call safety regression guard blocks hidden execution affordances'
  'Denied real provider safety regression paths remain blocked'
  'Real provider safety regression checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
