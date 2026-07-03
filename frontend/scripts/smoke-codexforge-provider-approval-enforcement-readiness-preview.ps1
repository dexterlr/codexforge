param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2480 Provider Approval Enforcement Readiness Preview"
  ScriptFile = "smoke-codexforge-provider-approval-enforcement-readiness-preview.ps1"
  Domain = "provider-approval-enforcement-readiness-preview"
  Route = "provider-approval-enforcement-readiness-preview"
  CommandLabel = "Go to Provider Approval Enforcement Readiness Preview"
  RouteHref = "/provider-approval-enforcement-readiness-preview"
  Phase = 2480
  Title = "Provider Approval Enforcement Readiness Preview"
  Markers = @(
  'Provider approval enforcement readiness preview'
  'Provider approval enforcement readiness preview defines backend approval enforcement requirements without approving or executing provider actions'
  'Provider approval enforcement readiness preview requires explicit operator approval before any future provider trial'
  'Provider approval enforcement readiness preview blocks unapproved execution'
  'Denied provider approval enforcement paths remain blocked'
  'Provider approval enforcement checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
