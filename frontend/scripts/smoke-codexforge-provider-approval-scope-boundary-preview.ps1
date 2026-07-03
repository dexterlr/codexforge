param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2416 Provider Approval Scope Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-approval-scope-boundary-preview.ps1"
  Domain = "provider-approval-scope-boundary-preview"
  Route = "provider-approval-scope-boundary-preview"
  CommandLabel = "Go to Provider Approval Scope Boundary Preview"
  RouteHref = "/provider-approval-scope-boundary-preview"
  Phase = 2416
  Title = "Provider Approval Scope Boundary Preview"
  Markers = @(
  'Provider approval scope boundary preview'
  'Provider approval scope boundary preview defines approval scope rules without granting permissions or executing provider actions'
  'Provider approval scope boundary preview keeps approvals constrained by provider family intent privacy class cost class and fixture id'
  'Provider approval scope boundary preview blocks broad approvals'
  'Denied provider approval scope paths remain blocked'
  'Provider approval scope checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
