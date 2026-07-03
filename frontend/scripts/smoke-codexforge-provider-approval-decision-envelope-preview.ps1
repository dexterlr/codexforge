param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2412 Provider Approval Decision Envelope Preview"
  ScriptFile = "smoke-codexforge-provider-approval-decision-envelope-preview.ps1"
  Domain = "provider-approval-decision-envelope-preview"
  Route = "provider-approval-decision-envelope-preview"
  CommandLabel = "Go to Provider Approval Decision Envelope Preview"
  RouteHref = "/provider-approval-decision-envelope-preview"
  Phase = 2412
  Title = "Provider Approval Decision Envelope Preview"
  Markers = @(
  'Provider approval decision envelope preview'
  'Provider approval decision envelope preview defines synthetic approval decision shape without persisting approvals or authorizing provider calls'
  'Provider approval decision envelope preview includes approved denied expired revoked pending and review-required states'
  'Provider approval decision envelope preview keeps live execution blocked'
  'Denied provider approval decision paths remain blocked'
  'Provider approval decision checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
