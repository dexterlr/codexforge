param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2805 Publish Gateway Upload Block Boundary Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-upload-block-boundary-wiring.ps1" `
  -Route "publish-gateway-upload-block-boundary-wiring" `
  -CommandLabel "Go to Publish Gateway Upload Block Boundary Wiring" `
  -RouteHref "/publish-gateway-upload-block-boundary-wiring" `
  -Phase "2805" `
  -Title "Publish Gateway Upload Block Boundary Wiring"
