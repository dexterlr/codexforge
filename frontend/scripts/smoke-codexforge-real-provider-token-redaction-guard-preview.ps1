param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2513 Real Provider Token Redaction Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-token-redaction-guard-preview.ps1"
  Domain = "real-provider-token-redaction-guard-preview"
  Route = "real-provider-token-redaction-guard-preview"
  CommandLabel = "Go to Real Provider Token Redaction Guard Preview"
  RouteHref = "/real-provider-token-redaction-guard-preview"
  Phase = 2513
  Title = "Real Provider Token Redaction Guard Preview"
  Markers = @(
  'Real provider token redaction guard preview'
  'Real provider token redaction guard preview defines token redaction requirements without storing tokens authorizing accounts or calling providers'
  'Real provider token redaction guard preview keeps tokens server-only and redacted'
  'Real provider token redaction guard preview blocks token leakage'
  'Denied real provider token redaction paths remain blocked'
  'Real provider token redaction checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
