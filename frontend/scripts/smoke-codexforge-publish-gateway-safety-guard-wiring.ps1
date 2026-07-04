param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2822 Publish Gateway Safety Guard Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-safety-guard-wiring.ps1" `
  -Route "publish-gateway-safety-guard-wiring" `
  -CommandLabel "Go to Publish Gateway Safety Guard Wiring" `
  -RouteHref "/publish-gateway-safety-guard-wiring" `
  -Phase "2822" `
  -Title "Publish Gateway Safety Guard Wiring"
