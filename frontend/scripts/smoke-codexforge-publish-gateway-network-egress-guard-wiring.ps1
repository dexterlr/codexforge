param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2812 Publish Gateway Network Egress Guard Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-network-egress-guard-wiring.ps1" `
  -Route "publish-gateway-network-egress-guard-wiring" `
  -CommandLabel "Go to Publish Gateway Network Egress Guard Wiring" `
  -RouteHref "/publish-gateway-network-egress-guard-wiring" `
  -Phase "2812" `
  -Title "Publish Gateway Network Egress Guard Wiring"
