param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2564 Approved Provider Trial Credential Token Blocker"
  ScriptFile = "smoke-codexforge-approved-provider-trial-credential-token-blocker.ps1"
  Domain = "approved-provider-trial-credential-token-blocker"
  Route = "approved-provider-trial-credential-token-blocker"
  CommandLabel = "Go to Approved Provider Trial Credential Token Blocker"
  RouteHref = "/approved-provider-trial-credential-token-blocker"
  Phase = 2564
  Title = "Approved Provider Trial Credential Token Blocker"
  Markers = @(
  'Approved provider trial credential token blocker'
  'Approved provider trial credential token blocker verifies no credentials or tokens are read stored exposed validated or bundled into frontend code'
  'Approved provider trial credential token blocker keeps credentials and tokens backend-only'
  'Approved provider trial credential token blocker blocks credential and token storage'
  'Denied approved provider credential token paths remain blocked'
  'Approved provider credential token checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
