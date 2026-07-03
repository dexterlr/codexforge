param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2411 Provider Approval Request Envelope Preview"
  ScriptFile = "smoke-codexforge-provider-approval-request-envelope-preview.ps1"
  Domain = "provider-approval-request-envelope-preview"
  Route = "provider-approval-request-envelope-preview"
  CommandLabel = "Go to Provider Approval Request Envelope Preview"
  RouteHref = "/provider-approval-request-envelope-preview"
  Phase = 2411
  Title = "Provider Approval Request Envelope Preview"
  Markers = @(
  'Provider approval request envelope preview'
  'Provider approval request envelope preview defines synthetic approval request shape without approving live provider execution'
  'Provider approval request envelope preview includes requested intent privacy class provider family cost class prompt boundary audit intent and denied execution state'
  'Provider approval request envelope preview keeps approval requests review-only'
  'Denied provider approval request paths remain blocked'
  'Provider approval request checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
