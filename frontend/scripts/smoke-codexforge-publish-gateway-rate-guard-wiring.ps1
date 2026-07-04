param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2819 Publish Gateway Rate Guard Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-rate-guard-wiring.ps1" `
  -Route "publish-gateway-rate-guard-wiring" `
  -CommandLabel "Go to Publish Gateway Rate Guard Wiring" `
  -RouteHref "/publish-gateway-rate-guard-wiring" `
  -Phase "2819" `
  -Title "Publish Gateway Rate Guard Wiring"
