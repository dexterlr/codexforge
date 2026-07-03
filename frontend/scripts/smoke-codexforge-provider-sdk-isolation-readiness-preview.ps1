param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2484 Provider SDK Isolation Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-sdk-isolation-readiness-preview.ps1"
  Domain = "provider-sdk-isolation-readiness-preview"
  Route = "provider-sdk-isolation-readiness-preview"
  CommandLabel = "Go to Provider SDK Isolation Readiness Preview"
  RouteHref = "/provider-sdk-isolation-readiness-preview"
  Phase = 2484
  Title = "Provider SDK Isolation Readiness Preview"
  Markers = @(
  'Provider SDK isolation readiness preview'
  'Provider SDK isolation readiness preview defines future SDK isolation requirements without importing SDKs initializing clients or creating provider clients'
  'Provider SDK isolation readiness preview keeps provider SDKs outside frontend diagnostics'
  'Provider SDK isolation readiness preview blocks SDK initialization'
  'Denied provider SDK isolation paths remain blocked'
  'Provider SDK isolation checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
