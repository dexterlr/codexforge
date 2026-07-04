param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-publish-gateway-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgePublishGatewayBackendWiringSmoke `
  -SmokeName "Phase 2796 Publish Gateway Job Envelope Wiring" `
  -ScriptFile "smoke-codexforge-publish-gateway-job-envelope-wiring.ps1" `
  -Route "publish-gateway-job-envelope-wiring" `
  -CommandLabel "Go to Publish Gateway Job Envelope Wiring" `
  -RouteHref "/publish-gateway-job-envelope-wiring" `
  -Phase "2796" `
  -Title "Publish Gateway Job Envelope Wiring"
