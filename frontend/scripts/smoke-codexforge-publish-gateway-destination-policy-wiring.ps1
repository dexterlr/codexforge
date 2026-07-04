param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2798 Publish Gateway Destination Policy Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-destination-policy-wiring.ps1" `
  -Route "publish-gateway-destination-policy-wiring" `
  -CommandLabel "Go to Publish Gateway Destination Policy Wiring" `
  -RouteHref "/publish-gateway-destination-policy-wiring" `
  -Phase "2798" `
  -Title "Publish Gateway Destination Policy Wiring"
