param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2799 Publish Gateway Asset Handoff Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-asset-handoff-wiring.ps1" `
  -Route "publish-gateway-asset-handoff-wiring" `
  -CommandLabel "Go to Publish Gateway Asset Handoff Wiring" `
  -RouteHref "/publish-gateway-asset-handoff-wiring" `
  -Phase "2799" `
  -Title "Publish Gateway Asset Handoff Wiring"
