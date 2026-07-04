param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2803 Publish Gateway Thumbnail Policy Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-thumbnail-policy-wiring.ps1" `
  -Route "publish-gateway-thumbnail-policy-wiring" `
  -CommandLabel "Go to Publish Gateway Thumbnail Policy Wiring" `
  -RouteHref "/publish-gateway-thumbnail-policy-wiring" `
  -Phase "2803" `
  -Title "Publish Gateway Thumbnail Policy Wiring"
