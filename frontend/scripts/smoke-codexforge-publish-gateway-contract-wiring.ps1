param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2795 Publish Gateway Contract Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-contract-wiring.ps1" `
  -Route "publish-gateway-contract-wiring" `
  -CommandLabel "Go to Publish Gateway Contract Wiring" `
  -RouteHref "/publish-gateway-contract-wiring" `
  -Phase "2795" `
  -Title "Publish Gateway Contract Wiring"
