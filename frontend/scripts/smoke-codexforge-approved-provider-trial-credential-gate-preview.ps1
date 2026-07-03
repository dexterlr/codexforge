param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2542 Approved Provider Trial Credential Gate Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-credential-gate-preview.ps1"
  Domain = "approved-provider-trial-credential-gate-preview"
  Route = "approved-provider-trial-credential-gate-preview"
  CommandLabel = "Go to Approved Provider Trial Credential Gate Preview"
  RouteHref = "/approved-provider-trial-credential-gate-preview"
  Phase = 2542
  Title = "Approved Provider Trial Credential Gate Preview"
  Markers = @(
  'Approved provider trial credential gate preview'
  'Approved provider trial credential gate preview defines backend-only credential gate requirements without reading storing validating or exposing credentials'
  'Approved provider trial credential gate preview keeps credentials outside frontend bundles and diagnostics'
  'Approved provider trial credential gate preview blocks credential storage'
  'Denied approved provider credential gate paths remain blocked'
  'Approved provider credential gate checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
