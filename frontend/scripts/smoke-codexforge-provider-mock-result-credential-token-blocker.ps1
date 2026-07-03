param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2401 Provider Mock Result Credential Token Blocker"
  ScriptFile = "smoke-codexforge-provider-mock-result-credential-token-blocker.ps1"
  Domain = "provider-mock-result-credential-token-blocker"
  Route = "provider-mock-result-credential-token-blocker"
  CommandLabel = "Go to Provider Mock Result Credential Token Blocker"
  RouteHref = "/provider-mock-result-credential-token-blocker"
  Phase = 2401
  Title = "Provider Mock Result Credential Token Blocker"
  Markers = @(
  'Provider mock result credential token blocker',
  'Provider mock result credential token blocker verifies no credentials or tokens are read stored exposed validated or bundled into frontend code',
  'Provider mock result credential token blocker keeps credentials and tokens backend-only',
  'Provider mock result credential token blocker blocks credential and token storage',
  'Denied provider mock result credential token paths remain blocked',
  'Provider mock result credential token checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
