param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2422 Provider Audit Redaction Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-audit-redaction-boundary-preview.ps1"
  Domain = "provider-audit-redaction-boundary-preview"
  Route = "provider-audit-redaction-boundary-preview"
  CommandLabel = "Go to Provider Audit Redaction Boundary Preview"
  RouteHref = "/provider-audit-redaction-boundary-preview"
  Phase = 2422
  Title = "Provider Audit Redaction Boundary Preview"
  Markers = @(
  'Provider audit redaction boundary preview'
  'Provider audit redaction boundary preview defines audit redaction requirements without inspecting real prompts or transmitting data'
  'Provider audit redaction boundary preview keeps sensitive prompt credential token and output fields out of review surfaces'
  'Provider audit redaction boundary preview blocks secret leakage'
  'Denied provider audit redaction paths remain blocked'
  'Provider audit redaction checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
