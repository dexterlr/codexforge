param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2418 Provider Approval Revocation Boundary Preview"
  ScriptFile = "smoke-codexforge-provider-approval-revocation-boundary-preview.ps1"
  Domain = "provider-approval-revocation-boundary-preview"
  Route = "provider-approval-revocation-boundary-preview"
  CommandLabel = "Go to Provider Approval Revocation Boundary Preview"
  RouteHref = "/provider-approval-revocation-boundary-preview"
  Phase = 2418
  Title = "Provider Approval Revocation Boundary Preview"
  Markers = @(
  'Provider approval revocation boundary preview'
  'Provider approval revocation boundary preview defines revocation semantics without mutating approval records or calling providers'
  'Provider approval revocation boundary preview keeps revocation backend-owned and auditable'
  'Provider approval revocation boundary preview blocks revoked execution'
  'Denied provider approval revocation paths remain blocked'
  'Provider approval revocation checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
