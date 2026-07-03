param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2467 Controlled Provider Dry Run Credential Token Blocker"
  ScriptFile = "smoke-codexforge-controlled-provider-dry-run-credential-token-blocker.ps1"
  Domain = "controlled-provider-dry-run-credential-token-blocker"
  Route = "controlled-provider-dry-run-credential-token-blocker"
  CommandLabel = "Go to Controlled Provider Dry Run Credential Token Blocker"
  RouteHref = "/controlled-provider-dry-run-credential-token-blocker"
  Phase = 2467
  Title = "Controlled Provider Dry Run Credential Token Blocker"
  Markers = @(
  'Controlled provider dry run credential token blocker'
  'Controlled provider dry run credential token blocker verifies no credentials or tokens are read stored exposed validated or bundled into frontend code'
  'Controlled provider dry run credential token blocker keeps credentials and tokens backend-only'
  'Controlled provider dry run credential token blocker blocks credential and token storage'
  'Denied controlled provider credential token paths remain blocked'
  'Controlled provider credential token checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
