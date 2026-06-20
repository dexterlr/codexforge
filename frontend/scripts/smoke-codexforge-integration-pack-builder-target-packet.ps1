param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 997 Integration Pack Builder Target Packet" `
  -ScriptFile "smoke-codexforge-integration-pack-builder-target-packet.ps1" `
  -Domain "src\lib\codexforge\integration-pack-builder-target-packet" `
  -Route "src\app\integration-pack-builder-target-packet" `
  -MainPanel "IntegrationPackBuilderTargetPacketPanel" `
  -CommandLabel "Go to Integration Pack Builder Target Packet" `
  -Modules @("integration-pack-builder-target-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildIntegrationPackBuilderTargetPacketStableKey", "buildIntegrationPackBuilderTargetPacket", "buildIntegrationPackBuilderTargetPacketItems", "buildIntegrationPackBuilderTargetPacketBoundary", "buildIntegrationPackBuilderTargetPacketModel", "summarizeIntegrationPackBuilderTargetPacket", "INTEGRATION_PACK_BUILDER_TARGET_PACKET_LANGUAGE") `
  -PhaseMarkers @("Integration pack builder target packet", "Integration pack builder target packet does not connect external services", "Integration pack building requires explicit operator approval", "Integration packets include connector permission and audit review", "Denied integration pack builder paths remain blocked", "Integration pack builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Integration pack builder target packet does not connect external services", "Integration pack building requires explicit operator approval", "Denied integration pack builder paths remain blocked") `
  -RouteHref "/integration-pack-builder-target-packet"

Write-Host "[OK] CodexForge Phase 997 Integration Pack Builder Target Packet smoke passed."
