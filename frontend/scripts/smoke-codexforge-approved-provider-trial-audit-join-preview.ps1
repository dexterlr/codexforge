param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2541 Approved Provider Trial Audit Join Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-audit-join-preview.ps1"
  Domain = "approved-provider-trial-audit-join-preview"
  Route = "approved-provider-trial-audit-join-preview"
  CommandLabel = "Go to Approved Provider Trial Audit Join Preview"
  RouteHref = "/approved-provider-trial-audit-join-preview"
  Phase = 2541
  Title = "Approved Provider Trial Audit Join Preview"
  Markers = @(
  'Approved provider trial audit join preview'
  'Approved provider trial audit join preview maps synthetic audit intent and audit result metadata into the trial without writing audit logs'
  'Approved provider trial audit join preview keeps audit persistence backend-owned and review-only'
  'Approved provider trial audit join preview blocks unverifiable execution claims'
  'Denied approved provider audit join paths remain blocked'
  'Approved provider audit join checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
