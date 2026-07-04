param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2825 Publish Gateway Backend Wiring Completion" `
  -ScriptFile "smoke-codexforge-publish-gateway-backend-wiring-completion.ps1" `
  -Route "publish-gateway-backend-wiring-completion" `
  -CommandLabel "Go to Publish Gateway Backend Wiring Completion" `
  -RouteHref "/publish-gateway-backend-wiring-completion" `
  -Phase "2825" `
  -Title "Publish Gateway Backend Wiring Completion"
