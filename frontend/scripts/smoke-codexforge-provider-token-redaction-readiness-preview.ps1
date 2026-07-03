param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2479 Provider Token Redaction Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-token-redaction-readiness-preview.ps1"
  Domain = "provider-token-redaction-readiness-preview"
  Route = "provider-token-redaction-readiness-preview"
  CommandLabel = "Go to Provider Token Redaction Readiness Preview"
  RouteHref = "/provider-token-redaction-readiness-preview"
  Phase = 2479
  Title = "Provider Token Redaction Readiness Preview"
  Markers = @(
  'Provider token redaction readiness preview'
  'Provider token redaction readiness preview defines backend-only token redaction requirements without storing tokens authorizing accounts or calling providers'
  'Provider token redaction readiness preview keeps tokens server-only and redacted'
  'Provider token redaction readiness preview blocks token leakage'
  'Denied provider token redaction paths remain blocked'
  'Provider token redaction checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
