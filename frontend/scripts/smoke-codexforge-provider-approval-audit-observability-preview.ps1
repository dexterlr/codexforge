param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2425 Provider Approval Audit Observability Preview"
  ScriptFile = "smoke-codexforge-provider-approval-audit-observability-preview.ps1"
  Domain = "provider-approval-audit-observability-preview"
  Route = "provider-approval-audit-observability-preview"
  CommandLabel = "Go to Provider Approval Audit Observability Preview"
  RouteHref = "/provider-approval-audit-observability-preview"
  Phase = 2425
  Title = "Provider Approval Audit Observability Preview"
  Markers = @(
  'Provider approval audit observability preview'
  'Provider approval audit observability preview defines synthetic observability metadata without sending telemetry or writing logs'
  'Provider approval audit observability preview keeps telemetry backend-owned and redacted'
  'Provider approval audit observability preview blocks telemetry transmission'
  'Denied provider approval audit observability paths remain blocked'
  'Provider approval audit observability checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
