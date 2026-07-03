param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2486 Provider Rate Limit Enforcement Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-rate-limit-enforcement-readiness-preview.ps1"
  Domain = "provider-rate-limit-enforcement-readiness-preview"
  Route = "provider-rate-limit-enforcement-readiness-preview"
  CommandLabel = "Go to Provider Rate Limit Enforcement Readiness Preview"
  RouteHref = "/provider-rate-limit-enforcement-readiness-preview"
  Phase = 2486
  Title = "Provider Rate Limit Enforcement Readiness Preview"
  Markers = @(
  'Provider rate limit enforcement readiness preview'
  'Provider rate limit enforcement readiness preview defines future rate limit enforcement without storing counters or sending provider traffic'
  'Provider rate limit enforcement readiness preview keeps rate limits backend-owned and auditable'
  'Provider rate limit enforcement readiness preview blocks live traffic'
  'Denied provider rate limit enforcement paths remain blocked'
  'Provider rate limit enforcement checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
