param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2369 Provider Dry Run Credential Token Blocker"
  ScriptFile = "smoke-codexforge-provider-dry-run-credential-token-blocker.ps1"
  Domain = "provider-dry-run-credential-token-blocker"
  Route = "provider-dry-run-credential-token-blocker"
  CommandLabel = "Go to Provider Dry Run Credential Token Blocker"
  RouteHref = "/provider-dry-run-credential-token-blocker"
  Phase = 2369
  Title = "Provider Dry Run Credential Token Blocker"
  Markers = @(
  'Provider dry run credential token blocker',
  'Provider dry run credential token blocker verifies no credentials or tokens are read stored exposed validated or bundled into frontend code',
  'Provider dry run credential token blocker keeps credentials and tokens backend-only',
  'Provider dry run credential token blocker blocks credential and token storage',
  'Denied provider dry run credential token paths remain blocked',
  'Provider dry run credential token checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-adapter-dry-run-harness-smoke-helper.ps1") @params

