param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2801 Publish Gateway Metadata Policy Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-metadata-policy-wiring.ps1" `
  -Route "publish-gateway-metadata-policy-wiring" `
  -CommandLabel "Go to Publish Gateway Metadata Policy Wiring" `
  -RouteHref "/publish-gateway-metadata-policy-wiring" `
  -Phase "2801" `
  -Title "Publish Gateway Metadata Policy Wiring"
