param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2820 Publish Gateway Cost Guard Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-cost-guard-wiring.ps1" `
  -Route "publish-gateway-cost-guard-wiring" `
  -CommandLabel "Go to Publish Gateway Cost Guard Wiring" `
  -RouteHref "/publish-gateway-cost-guard-wiring" `
  -Phase "2820" `
  -Title "Publish Gateway Cost Guard Wiring"
