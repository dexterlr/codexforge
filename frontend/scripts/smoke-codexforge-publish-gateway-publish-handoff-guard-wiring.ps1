param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2809 Publish Gateway Publish Handoff Guard Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-publish-handoff-guard-wiring.ps1" `
  -Route "publish-gateway-publish-handoff-guard-wiring" `
  -CommandLabel "Go to Publish Gateway Publish Handoff Guard Wiring" `
  -RouteHref "/publish-gateway-publish-handoff-guard-wiring" `
  -Phase "2809" `
  -Title "Publish Gateway Publish Handoff Guard Wiring"
