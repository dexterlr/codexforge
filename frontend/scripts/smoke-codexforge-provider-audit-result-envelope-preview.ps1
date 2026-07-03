param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2414 Provider Audit Result Envelope Preview"
  ScriptFile = "smoke-codexforge-provider-audit-result-envelope-preview.ps1"
  Domain = "provider-audit-result-envelope-preview"
  Route = "provider-audit-result-envelope-preview"
  CommandLabel = "Go to Provider Audit Result Envelope Preview"
  RouteHref = "/provider-audit-result-envelope-preview"
  Phase = 2414
  Title = "Provider Audit Result Envelope Preview"
  Markers = @(
  'Provider audit result envelope preview'
  'Provider audit result envelope preview defines synthetic audit result metadata without receiving real model outputs or persisting results'
  'Provider audit result envelope preview includes mock result id safety state redaction state approval state and denied execution state'
  'Provider audit result envelope preview keeps result audit backend-owned'
  'Denied provider audit result paths remain blocked'
  'Provider audit result checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
