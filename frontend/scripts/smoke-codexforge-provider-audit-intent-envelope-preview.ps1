param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2413 Provider Audit Intent Envelope Preview"
  ScriptFile = "smoke-codexforge-provider-audit-intent-envelope-preview.ps1"
  Domain = "provider-audit-intent-envelope-preview"
  Route = "provider-audit-intent-envelope-preview"
  CommandLabel = "Go to Provider Audit Intent Envelope Preview"
  RouteHref = "/provider-audit-intent-envelope-preview"
  Phase = 2413
  Title = "Provider Audit Intent Envelope Preview"
  Markers = @(
  'Provider audit intent envelope preview'
  'Provider audit intent envelope preview defines synthetic audit intent metadata without writing audit logs or sending telemetry'
  'Provider audit intent envelope preview includes operator intent fixture id provider family privacy class approval scope and denial state'
  'Provider audit intent envelope preview keeps audit persistence backend-owned'
  'Denied provider audit intent paths remain blocked'
  'Provider audit intent checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
