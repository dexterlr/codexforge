param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 996 Documentation Pack Builder Target Packet" `
  -ScriptFile "smoke-codexforge-documentation-pack-builder-target-packet.ps1" `
  -Domain "src\lib\codexforge\documentation-pack-builder-target-packet" `
  -Route "src\app\documentation-pack-builder-target-packet" `
  -MainPanel "DocumentationPackBuilderTargetPacketPanel" `
  -CommandLabel "Go to Documentation Pack Builder Target Packet" `
  -Modules @("documentation-pack-builder-target-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDocumentationPackBuilderTargetPacketStableKey", "buildDocumentationPackBuilderTargetPacket", "buildDocumentationPackBuilderTargetPacketItems", "buildDocumentationPackBuilderTargetPacketBoundary", "buildDocumentationPackBuilderTargetPacketModel", "summarizeDocumentationPackBuilderTargetPacket", "DOCUMENTATION_PACK_BUILDER_TARGET_PACKET_LANGUAGE") `
  -PhaseMarkers @("Documentation pack builder target packet", "Documentation pack builder target packet does not export files", "Documentation pack building requires explicit operator approval", "Documentation packets include evidence result and packaging review", "Denied documentation pack builder paths remain blocked", "Documentation pack builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Documentation pack builder target packet does not export files", "Documentation pack building requires explicit operator approval", "Denied documentation pack builder paths remain blocked") `
  -RouteHref "/documentation-pack-builder-target-packet"

Write-Host "[OK] CodexForge Phase 996 Documentation Pack Builder Target Packet smoke passed."
