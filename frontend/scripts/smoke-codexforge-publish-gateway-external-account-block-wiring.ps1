param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2806 Publish Gateway External Account Block Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-external-account-block-wiring.ps1" `
  -Route "publish-gateway-external-account-block-wiring" `
  -CommandLabel "Go to Publish Gateway External Account Block Wiring" `
  -RouteHref "/publish-gateway-external-account-block-wiring" `
  -Phase "2806" `
  -Title "Publish Gateway External Account Block Wiring"
