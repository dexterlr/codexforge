param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2804 Publish Gateway Schedule Block Boundary Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-schedule-block-boundary-wiring.ps1" `
  -Route "publish-gateway-schedule-block-boundary-wiring" `
  -CommandLabel "Go to Publish Gateway Schedule Block Boundary Wiring" `
  -RouteHref "/publish-gateway-schedule-block-boundary-wiring" `
  -Phase "2804" `
  -Title "Publish Gateway Schedule Block Boundary Wiring"
