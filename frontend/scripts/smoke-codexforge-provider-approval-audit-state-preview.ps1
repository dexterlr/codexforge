param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2428 Provider Approval Audit State Preview"
  ScriptFile = "smoke-codexforge-provider-approval-audit-state-preview.ps1"
  Domain = "provider-approval-audit-state-preview"
  Route = "provider-approval-audit-state-preview"
  CommandLabel = "Go to Provider Approval Audit State Preview"
  RouteHref = "/provider-approval-audit-state-preview"
  Phase = 2428
  Title = "Provider Approval Audit State Preview"
  Markers = @(
  'Provider approval audit state preview'
  'Provider approval audit state preview defines synthetic approval audit states without starting jobs queues workers services or route handlers'
  'Provider approval audit state preview keeps state local deterministic and review-only'
  'Provider approval audit state preview blocks dispatch'
  'Denied provider approval audit state paths remain blocked'
  'Provider approval audit state checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
