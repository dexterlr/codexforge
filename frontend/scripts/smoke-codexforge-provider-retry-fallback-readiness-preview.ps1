param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2488 Provider Retry Fallback Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-retry-fallback-readiness-preview.ps1"
  Domain = "provider-retry-fallback-readiness-preview"
  Route = "provider-retry-fallback-readiness-preview"
  CommandLabel = "Go to Provider Retry Fallback Readiness Preview"
  RouteHref = "/provider-retry-fallback-readiness-preview"
  Phase = 2488
  Title = "Provider Retry Fallback Readiness Preview"
  Markers = @(
  'Provider retry fallback readiness preview'
  'Provider retry fallback readiness preview defines future retry and fallback requirements without retrying provider calls or calling fallback providers'
  'Provider retry fallback readiness preview keeps retry fallback backend-owned and approval-gated'
  'Provider retry fallback readiness preview blocks live retry and fallback execution'
  'Denied provider retry fallback paths remain blocked'
  'Provider retry fallback checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
