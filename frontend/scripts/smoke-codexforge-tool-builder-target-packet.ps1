param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 990 Tool Builder Target Packet" `
  -ScriptFile "smoke-codexforge-tool-builder-target-packet.ps1" `
  -Domain "src\lib\codexforge\tool-builder-target-packet" `
  -Route "src\app\tool-builder-target-packet" `
  -MainPanel "ToolBuilderTargetPacketPanel" `
  -CommandLabel "Go to Tool Builder Target Packet" `
  -Modules @("tool-builder-target-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildToolBuilderTargetPacketStableKey", "buildToolBuilderTargetPacket", "buildToolBuilderTargetPacketItems", "buildToolBuilderTargetPacketBoundary", "buildToolBuilderTargetPacketModel", "summarizeToolBuilderTargetPacket", "TOOL_BUILDER_TARGET_PACKET_LANGUAGE") `
  -PhaseMarkers @("Tool builder target packet", "Tool builder target packet does not create tools", "Tool building requires explicit operator approval", "Tool packets include file command runtime and validation review", "Denied tool builder paths remain blocked", "Tool builder target checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Tool builder target packet does not create tools", "Tool building requires explicit operator approval", "Denied tool builder paths remain blocked") `
  -RouteHref "/tool-builder-target-packet"

Write-Host "[OK] CodexForge Phase 990 Tool Builder Target Packet smoke passed."
