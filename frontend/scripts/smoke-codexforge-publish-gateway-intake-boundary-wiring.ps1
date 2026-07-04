param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2794 Publish Gateway Intake Boundary Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-intake-boundary-wiring.ps1" `
  -Route "publish-gateway-intake-boundary-wiring" `
  -CommandLabel "Go to Publish Gateway Intake Boundary Wiring" `
  -RouteHref "/publish-gateway-intake-boundary-wiring" `
  -Phase "2794" `
  -Title "Publish Gateway Intake Boundary Wiring"
