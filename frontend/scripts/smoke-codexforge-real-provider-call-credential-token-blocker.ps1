param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2533 Real Provider Call Credential Token Blocker"
  ScriptFile = "smoke-codexforge-real-provider-call-credential-token-blocker.ps1"
  Domain = "real-provider-call-credential-token-blocker"
  Route = "real-provider-call-credential-token-blocker"
  CommandLabel = "Go to Real Provider Call Credential Token Blocker"
  RouteHref = "/real-provider-call-credential-token-blocker"
  Phase = 2533
  Title = "Real Provider Call Credential Token Blocker"
  Markers = @(
  'Real provider call credential token blocker'
  'Real provider call credential token blocker verifies no credentials or tokens are read stored exposed validated or bundled into frontend code'
  'Real provider call credential token blocker keeps credentials and tokens backend-only'
  'Real provider call credential token blocker blocks credential and token storage'
  'Denied real provider credential token paths remain blocked'
  'Real provider credential token checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
