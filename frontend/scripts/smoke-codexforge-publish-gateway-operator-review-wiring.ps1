param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2823 Publish Gateway Operator Review Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-operator-review-wiring.ps1" `
  -Route "publish-gateway-operator-review-wiring" `
  -CommandLabel "Go to Publish Gateway Operator Review Wiring" `
  -RouteHref "/publish-gateway-operator-review-wiring" `
  -Phase "2823" `
  -Title "Publish Gateway Operator Review Wiring"
