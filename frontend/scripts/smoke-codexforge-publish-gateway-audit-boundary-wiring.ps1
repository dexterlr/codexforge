param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2814 Publish Gateway Audit Boundary Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-audit-boundary-wiring.ps1" `
  -Route "publish-gateway-audit-boundary-wiring" `
  -CommandLabel "Go to Publish Gateway Audit Boundary Wiring" `
  -RouteHref "/publish-gateway-audit-boundary-wiring" `
  -Phase "2814" `
  -Title "Publish Gateway Audit Boundary Wiring"
