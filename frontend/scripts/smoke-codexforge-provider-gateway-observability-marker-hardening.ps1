param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-provider-gateway-hardening-smoke-helper.ps1")

Invoke-CodexForgeProviderGatewayHardeningSmoke `
  -SmokeName "Phase 2608 Provider Gateway Observability Marker Hardening" `
  -ScriptFile "smoke-codexforge-provider-gateway-observability-marker-hardening.ps1" `
  -Route "provider-gateway-observability-marker-hardening" `
  -CommandLabel "Go to Provider Gateway Observability Marker Hardening" `
  -RouteHref "/provider-gateway-observability-marker-hardening" `
  -Phase "2608" `
  -Title "Provider Gateway Observability Marker Hardening" `
  -Markers @(
  "2602?2633 ? Provider Gateway Hardening Mega Batch v1",
  "Provider Gateway Hardening",
  "review-only provider gateway diagnostic",
  "blocked provider execution",
  "protected provider boundary",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no network egress",
  "no fetch/network calls",
  "no frontend persistence",
  "no browser storage writes",
  "no connector calls",
  "no upload/download",
  "no render/export/publish/schedule",
  "no command execution from the app",
  "no service creation",
  "no API creation from frontend",
  "no queue dispatch",
  "no worker dispatch",
  "no process spawning",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "approval and audit enforcement",
  "denial handling",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "safety guard",
  "privacy guard",
  "gateway state",
  "gateway recovery",
  "completion guard",
  "next likely batch: 2634?2665 ? Asset Storage Backend Wiring"
)
