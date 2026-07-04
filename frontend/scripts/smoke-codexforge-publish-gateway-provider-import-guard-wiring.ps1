param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2811 Publish Gateway Provider Import Guard Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-provider-import-guard-wiring.ps1" `
  -Route "publish-gateway-provider-import-guard-wiring" `
  -CommandLabel "Go to Publish Gateway Provider Import Guard Wiring" `
  -RouteHref "/publish-gateway-provider-import-guard-wiring" `
  -Phase "2811" `
  -Title "Publish Gateway Provider Import Guard Wiring"
