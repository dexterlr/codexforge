param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2818 Publish Gateway Fallback Policy Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-fallback-policy-wiring.ps1" `
  -Route "publish-gateway-fallback-policy-wiring" `
  -CommandLabel "Go to Publish Gateway Fallback Policy Wiring" `
  -RouteHref "/publish-gateway-fallback-policy-wiring" `
  -Phase "2818" `
  -Title "Publish Gateway Fallback Policy Wiring"
