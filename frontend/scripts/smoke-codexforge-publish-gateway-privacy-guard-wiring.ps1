param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2821 Publish Gateway Privacy Guard Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-privacy-guard-wiring.ps1" `
  -Route "publish-gateway-privacy-guard-wiring" `
  -CommandLabel "Go to Publish Gateway Privacy Guard Wiring" `
  -RouteHref "/publish-gateway-privacy-guard-wiring" `
  -Phase "2821" `
  -Title "Publish Gateway Privacy Guard Wiring"
