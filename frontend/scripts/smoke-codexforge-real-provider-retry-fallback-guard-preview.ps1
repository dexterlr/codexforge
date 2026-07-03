param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2520 Real Provider Retry Fallback Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-retry-fallback-guard-preview.ps1"
  Domain = "real-provider-retry-fallback-guard-preview"
  Route = "real-provider-retry-fallback-guard-preview"
  CommandLabel = "Go to Real Provider Retry Fallback Guard Preview"
  RouteHref = "/real-provider-retry-fallback-guard-preview"
  Phase = 2520
  Title = "Real Provider Retry Fallback Guard Preview"
  Markers = @(
  'Real provider retry fallback guard preview'
  'Real provider retry fallback guard preview defines retry fallback guard requirements without retrying provider calls or calling fallback providers'
  'Real provider retry fallback guard preview keeps retry fallback backend-owned and approval-gated'
  'Real provider retry fallback guard preview blocks live retry and fallback execution'
  'Denied real provider retry fallback paths remain blocked'
  'Real provider retry fallback checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
