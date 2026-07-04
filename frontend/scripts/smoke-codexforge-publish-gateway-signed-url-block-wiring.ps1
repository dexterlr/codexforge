param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2808 Publish Gateway Signed URL Block Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-signed-url-block-wiring.ps1" `
  -Route "publish-gateway-signed-url-block-wiring" `
  -CommandLabel "Go to Publish Gateway Signed URL Block Wiring" `
  -RouteHref "/publish-gateway-signed-url-block-wiring" `
  -Phase "2808" `
  -Title "Publish Gateway Signed URL Block Wiring"
