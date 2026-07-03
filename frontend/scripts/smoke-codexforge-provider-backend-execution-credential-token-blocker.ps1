param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2501 Provider Backend Execution Credential Token Blocker"
  ScriptFile = "smoke-codexforge-provider-backend-execution-credential-token-blocker.ps1"
  Domain = "provider-backend-execution-credential-token-blocker"
  Route = "provider-backend-execution-credential-token-blocker"
  CommandLabel = "Go to Provider Backend Execution Credential Token Blocker"
  RouteHref = "/provider-backend-execution-credential-token-blocker"
  Phase = 2501
  Title = "Provider Backend Execution Credential Token Blocker"
  Markers = @(
  'Provider backend execution credential token blocker'
  'Provider backend execution credential token blocker verifies no credentials or tokens are read stored exposed validated or bundled into frontend code'
  'Provider backend execution credential token blocker keeps credentials and tokens backend-only'
  'Provider backend execution credential token blocker blocks credential and token storage'
  'Denied provider backend execution credential token paths remain blocked'
  'Provider backend execution credential token checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-execution-readiness-smoke-helper.ps1") @params
