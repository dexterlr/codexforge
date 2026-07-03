param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2512 Real Provider Credential Presence Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-credential-presence-guard-preview.ps1"
  Domain = "real-provider-credential-presence-guard-preview"
  Route = "real-provider-credential-presence-guard-preview"
  CommandLabel = "Go to Real Provider Credential Presence Guard Preview"
  RouteHref = "/real-provider-credential-presence-guard-preview"
  Phase = 2512
  Title = "Real Provider Credential Presence Guard Preview"
  Markers = @(
  'Real provider credential presence guard preview'
  'Real provider credential presence guard preview defines backend-only credential presence checks without reading storing validating or exposing credentials'
  'Real provider credential presence guard preview keeps credentials outside frontend bundles and diagnostics'
  'Real provider credential presence guard preview blocks credential storage'
  'Denied real provider credential guard paths remain blocked'
  'Real provider credential guard checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
