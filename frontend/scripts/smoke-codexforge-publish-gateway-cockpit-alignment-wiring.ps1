param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2824 Publish Gateway Cockpit Alignment Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-cockpit-alignment-wiring.ps1" `
  -Route "publish-gateway-cockpit-alignment-wiring" `
  -CommandLabel "Go to Publish Gateway Cockpit Alignment Wiring" `
  -RouteHref "/publish-gateway-cockpit-alignment-wiring" `
  -Phase "2824" `
  -Title "Publish Gateway Cockpit Alignment Wiring"
