param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2800 Publish Gateway Artifact Handoff Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-artifact-handoff-wiring.ps1" `
  -Route "publish-gateway-artifact-handoff-wiring" `
  -CommandLabel "Go to Publish Gateway Artifact Handoff Wiring" `
  -RouteHref "/publish-gateway-artifact-handoff-wiring" `
  -Phase "2800" `
  -Title "Publish Gateway Artifact Handoff Wiring"
