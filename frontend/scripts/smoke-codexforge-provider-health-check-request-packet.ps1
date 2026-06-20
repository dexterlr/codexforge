param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 923 Provider Health Check Request Packet" `
  -ScriptFile "smoke-codexforge-provider-health-check-request-packet.ps1" `
  -Domain "src\lib\codexforge\provider-health-check-request-packet" `
  -Route "src\app\provider-health-check-request-packet" `
  -MainPanel "ProviderHealthCheckRequestPacketPanel" `
  -CommandLabel "Go to Provider Health Check Request Packet" `
  -Modules @("provider-health-check-request-packet-model.ts", "index.ts") `
  -Components @("ProviderHealthCheckRequestPacketPanel.tsx", "index.ts") `
  -Exports @("buildProviderHealthCheckRequestPacketStableKey", "buildProviderHealthCheckRequestPacket", "buildProviderHealthCheckRequestPacketItems", "buildProviderHealthCheckRequestPacketBoundary", "buildProviderHealthCheckRequestPacketModel", "summarizeProviderHealthCheckRequestPacket", "PROVIDER_HEALTH_CHECK_REQUEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("Provider health check request packet", "Provider health check request packet does not send requests", "Health check requests require explicit operator approval", "Request packets include credential boundary state", "Denied health check request paths remain blocked", "Provider health request checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Provider health check request packet does not send requests", "Health check requests require explicit operator approval", "Denied health check request paths remain blocked") `
  -RouteHref "/provider-health-check-request-packet"

Write-Host "[OK] CodexForge Phase 923 Provider health check request packet smoke passed."
