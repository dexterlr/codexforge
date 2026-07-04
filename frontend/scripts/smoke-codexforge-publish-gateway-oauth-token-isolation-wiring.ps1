param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2807 Publish Gateway OAuth Token Isolation Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-oauth-token-isolation-wiring.ps1" `
  -Route "publish-gateway-oauth-token-isolation-wiring" `
  -CommandLabel "Go to Publish Gateway OAuth Token Isolation Wiring" `
  -RouteHref "/publish-gateway-oauth-token-isolation-wiring" `
  -Phase "2807" `
  -Title "Publish Gateway OAuth Token Isolation Wiring"
