param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 991 Research Pack Builder Target Packet" `
  -ScriptFile "smoke-codexforge-research-pack-builder-target-packet.ps1" `
  -Domain "src\lib\codexforge\research-pack-builder-target-packet" `
  -Route "src\app\research-pack-builder-target-packet" `
  -MainPanel "ResearchPackBuilderTargetPacketPanel" `
  -CommandLabel "Go to Research Pack Builder Target Packet" `
  -Modules @("research-pack-builder-target-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildResearchPackBuilderTargetPacketStableKey", "buildResearchPackBuilderTargetPacket", "buildResearchPackBuilderTargetPacketItems", "buildResearchPackBuilderTargetPacketBoundary", "buildResearchPackBuilderTargetPacketModel", "summarizeResearchPackBuilderTargetPacket", "RESEARCH_PACK_BUILDER_TARGET_PACKET_LANGUAGE") `
  -PhaseMarkers @("Research pack builder target packet", "Research pack builder target packet does not browse or call providers", "Research pack building requires explicit operator approval", "Research packets include source evidence and freshness review", "Denied research pack builder paths remain blocked", "Research pack builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Research pack builder target packet does not browse or call providers", "Research pack building requires explicit operator approval", "Denied research pack builder paths remain blocked") `
  -RouteHref "/research-pack-builder-target-packet"

Write-Host "[OK] CodexForge Phase 991 Research Pack Builder Target Packet smoke passed."
