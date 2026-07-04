param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2817 Publish Gateway Retry Policy Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-retry-policy-wiring.ps1" `
  -Route "publish-gateway-retry-policy-wiring" `
  -CommandLabel "Go to Publish Gateway Retry Policy Wiring" `
  -RouteHref "/publish-gateway-retry-policy-wiring" `
  -Phase "2817" `
  -Title "Publish Gateway Retry Policy Wiring"
