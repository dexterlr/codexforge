param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2813 Publish Gateway Approval Boundary Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-approval-boundary-wiring.ps1" `
  -Route "publish-gateway-approval-boundary-wiring" `
  -CommandLabel "Go to Publish Gateway Approval Boundary Wiring" `
  -RouteHref "/publish-gateway-approval-boundary-wiring" `
  -Phase "2813" `
  -Title "Publish Gateway Approval Boundary Wiring"
