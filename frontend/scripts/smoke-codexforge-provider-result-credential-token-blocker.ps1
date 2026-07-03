param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2594 Provider Result Credential Token Blocker"
  ScriptFile = "smoke-codexforge-provider-result-credential-token-blocker.ps1"
  Domain = "provider-result-credential-token-blocker"
  Route = "provider-result-credential-token-blocker"
  CommandLabel = "Go to Provider Result Credential Token Blocker"
  RouteHref = "/provider-result-credential-token-blocker"
  Phase = 2594
  Title = "Provider Result Credential Token Blocker"
  Markers = @(
  'Provider result credential token blocker'
  'Provider result credential token blocker verifies no credentials or tokens are read stored exposed validated or bundled into frontend code'
  'Provider result credential token blocker keeps credentials and tokens backend-only'
  'Provider result credential token blocker blocks credential and token storage'
  'Denied provider result credential token paths remain blocked'
  'Provider result credential token checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-result-review-recovery-smoke-helper.ps1") @params
