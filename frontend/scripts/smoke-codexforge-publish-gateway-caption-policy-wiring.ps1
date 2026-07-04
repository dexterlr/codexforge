param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2802 Publish Gateway Caption Policy Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-caption-policy-wiring.ps1" `
  -Route "publish-gateway-caption-policy-wiring" `
  -CommandLabel "Go to Publish Gateway Caption Policy Wiring" `
  -RouteHref "/publish-gateway-caption-policy-wiring" `
  -Phase "2802" `
  -Title "Publish Gateway Caption Policy Wiring"
