param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2815 Publish Gateway Redaction Boundary Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-redaction-boundary-wiring.ps1" `
  -Route "publish-gateway-redaction-boundary-wiring" `
  -CommandLabel "Go to Publish Gateway Redaction Boundary Wiring" `
  -RouteHref "/publish-gateway-redaction-boundary-wiring" `
  -Phase "2815" `
  -Title "Publish Gateway Redaction Boundary Wiring"
