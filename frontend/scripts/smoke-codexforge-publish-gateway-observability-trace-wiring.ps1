param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2816 Publish Gateway Observability Trace Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-observability-trace-wiring.ps1" `
  -Route "publish-gateway-observability-trace-wiring" `
  -CommandLabel "Go to Publish Gateway Observability Trace Wiring" `
  -RouteHref "/publish-gateway-observability-trace-wiring" `
  -Phase "2816" `
  -Title "Publish Gateway Observability Trace Wiring"
