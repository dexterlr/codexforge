param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2797 Publish Gateway Channel Policy Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-channel-policy-wiring.ps1" `
  -Route "publish-gateway-channel-policy-wiring" `
  -CommandLabel "Go to Publish Gateway Channel Policy Wiring" `
  -RouteHref "/publish-gateway-channel-policy-wiring" `
  -Phase "2797" `
  -Title "Publish Gateway Channel Policy Wiring"
