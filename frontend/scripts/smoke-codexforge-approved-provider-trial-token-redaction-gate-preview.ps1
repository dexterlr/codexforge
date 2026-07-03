param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2543 Approved Provider Trial Token Redaction Gate Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-token-redaction-gate-preview.ps1"
  Domain = "approved-provider-trial-token-redaction-gate-preview"
  Route = "approved-provider-trial-token-redaction-gate-preview"
  CommandLabel = "Go to Approved Provider Trial Token Redaction Gate Preview"
  RouteHref = "/approved-provider-trial-token-redaction-gate-preview"
  Phase = 2543
  Title = "Approved Provider Trial Token Redaction Gate Preview"
  Markers = @(
  'Approved provider trial token redaction gate preview'
  'Approved provider trial token redaction gate preview defines token redaction requirements without storing tokens authorizing accounts or calling providers'
  'Approved provider trial token redaction gate preview keeps tokens server-only and redacted'
  'Approved provider trial token redaction gate preview blocks token leakage'
  'Denied approved provider token redaction paths remain blocked'
  'Approved provider token redaction checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
