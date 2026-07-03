param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2487 Provider Timeout Enforcement Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-timeout-enforcement-readiness-preview.ps1"
  Domain = "provider-timeout-enforcement-readiness-preview"
  Route = "provider-timeout-enforcement-readiness-preview"
  CommandLabel = "Go to Provider Timeout Enforcement Readiness Preview"
  RouteHref = "/provider-timeout-enforcement-readiness-preview"
  Phase = 2487
  Title = "Provider Timeout Enforcement Readiness Preview"
  Markers = @(
  'Provider timeout enforcement readiness preview'
  'Provider timeout enforcement readiness preview defines future timeout enforcement without provider calls or scheduling live work'
  'Provider timeout enforcement readiness preview keeps timeout enforcement backend-owned and deterministic'
  'Provider timeout enforcement readiness preview blocks live timeout execution'
  'Denied provider timeout enforcement paths remain blocked'
  'Provider timeout enforcement checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
