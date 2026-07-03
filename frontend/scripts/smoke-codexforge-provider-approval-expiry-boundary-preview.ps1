param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2417 Provider Approval Expiry Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-approval-expiry-boundary-preview.ps1"
  Domain = "provider-approval-expiry-boundary-preview"
  Route = "provider-approval-expiry-boundary-preview"
  CommandLabel = "Go to Provider Approval Expiry Boundary Preview"
  RouteHref = "/provider-approval-expiry-boundary-preview"
  Phase = 2417
  Title = "Provider Approval Expiry Boundary Preview"
  Markers = @(
  'Provider approval expiry boundary preview'
  'Provider approval expiry boundary preview defines expiry semantics without scheduling jobs or persisting timers'
  'Provider approval expiry boundary preview keeps expiry enforcement backend-owned and deterministic'
  'Provider approval expiry boundary preview blocks stale approval execution'
  'Denied provider approval expiry paths remain blocked'
  'Provider approval expiry checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
