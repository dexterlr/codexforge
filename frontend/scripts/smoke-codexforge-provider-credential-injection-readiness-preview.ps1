param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2478 Provider Credential Injection Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-credential-injection-readiness-preview.ps1"
  Domain = "provider-credential-injection-readiness-preview"
  Route = "provider-credential-injection-readiness-preview"
  CommandLabel = "Go to Provider Credential Injection Readiness Preview"
  RouteHref = "/provider-credential-injection-readiness-preview"
  Phase = 2478
  Title = "Provider Credential Injection Readiness Preview"
  Markers = @(
  'Provider credential injection readiness preview'
  'Provider credential injection readiness preview defines backend-only credential injection requirements without reading storing validating or exposing credentials'
  'Provider credential injection readiness preview keeps credentials outside frontend bundles and diagnostics'
  'Provider credential injection readiness preview blocks credential storage'
  'Denied provider credential injection paths remain blocked'
  'Provider credential injection checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
