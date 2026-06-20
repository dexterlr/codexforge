param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 924 Provider Health Check Result Packet" `
  -ScriptFile "smoke-codexforge-provider-health-check-result-packet.ps1" `
  -Domain "src\lib\codexforge\provider-health-check-result-packet" `
  -Route "src\app\provider-health-check-result-packet" `
  -MainPanel "ProviderHealthCheckResultPacketPanel" `
  -CommandLabel "Go to Provider Health Check Result Packet" `
  -Modules @("provider-health-check-result-packet-model.ts", "index.ts") `
  -Components @("ProviderHealthCheckResultPacketPanel.tsx", "index.ts") `
  -Exports @("buildProviderHealthCheckResultPacketStableKey", "buildProviderHealthCheckResultPacket", "buildProviderHealthCheckResultPacketItems", "buildProviderHealthCheckResultPacketBoundary", "buildProviderHealthCheckResultPacketModel", "summarizeProviderHealthCheckResultPacket", "PROVIDER_HEALTH_CHECK_RESULT_PACKET_LANGUAGE") `
  -PhaseMarkers @("Provider health check result packet", "Provider health check result packet does not persist live results", "Health check result capture requires explicit operator approval", "Result packets return through shared evidence review", "Denied health check result paths remain blocked", "Provider health result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Provider health check result packet does not persist live results", "Health check result capture requires explicit operator approval", "Denied health check result paths remain blocked") `
  -RouteHref "/provider-health-check-result-packet"

Write-Host "[OK] CodexForge Phase 924 Provider health check result packet smoke passed."
