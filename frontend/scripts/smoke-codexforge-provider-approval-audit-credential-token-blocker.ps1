param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2434 Provider Approval Audit Credential Token Blocker"
  ScriptFile = "smoke-codexforge-provider-approval-audit-credential-token-blocker.ps1"
  Domain = "provider-approval-audit-credential-token-blocker"
  Route = "provider-approval-audit-credential-token-blocker"
  CommandLabel = "Go to Provider Approval Audit Credential Token Blocker"
  RouteHref = "/provider-approval-audit-credential-token-blocker"
  Phase = 2434
  Title = "Provider Approval Audit Credential Token Blocker"
  Markers = @(
  'Provider approval audit credential token blocker'
  'Provider approval audit credential token blocker verifies no credentials or tokens are read stored exposed validated or bundled into frontend code'
  'Provider approval audit credential token blocker keeps credentials and tokens backend-only'
  'Provider approval audit credential token blocker blocks credential and token storage'
  'Denied provider approval audit credential token paths remain blocked'
  'Provider approval audit credential token checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
