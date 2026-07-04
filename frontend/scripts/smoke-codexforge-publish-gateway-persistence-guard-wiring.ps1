param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2810 Publish Gateway Persistence Guard Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-persistence-guard-wiring.ps1" `
  -Route "publish-gateway-persistence-guard-wiring" `
  -CommandLabel "Go to Publish Gateway Persistence Guard Wiring" `
  -RouteHref "/publish-gateway-persistence-guard-wiring" `
  -Phase "2810" `
  -Title "Publish Gateway Persistence Guard Wiring"
