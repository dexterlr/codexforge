param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 994 Trading Workspace Builder Target Packet" `
  -ScriptFile "smoke-codexforge-trading-workspace-builder-target-packet.ps1" `
  -Domain "src\lib\codexforge\trading-workspace-builder-target-packet" `
  -Route "src\app\trading-workspace-builder-target-packet" `
  -MainPanel "TradingWorkspaceBuilderTargetPacketPanel" `
  -CommandLabel "Go to Trading Workspace Builder Target Packet" `
  -Modules @("trading-workspace-builder-target-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildTradingWorkspaceBuilderTargetPacketStableKey", "buildTradingWorkspaceBuilderTargetPacket", "buildTradingWorkspaceBuilderTargetPacketItems", "buildTradingWorkspaceBuilderTargetPacketBoundary", "buildTradingWorkspaceBuilderTargetPacketModel", "summarizeTradingWorkspaceBuilderTargetPacket", "TRADING_WORKSPACE_BUILDER_TARGET_PACKET_LANGUAGE") `
  -PhaseMarkers @("Trading workspace builder target packet", "Trading workspace builder target packet does not trade or call brokers", "Trading workspace building requires explicit operator approval", "Trading packets include risk evidence and research review", "Denied trading workspace builder paths remain blocked", "Trading workspace builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Trading workspace builder target packet does not trade or call brokers", "Trading workspace building requires explicit operator approval", "Denied trading workspace builder paths remain blocked") `
  -RouteHref "/trading-workspace-builder-target-packet"

Write-Host "[OK] CodexForge Phase 994 Trading Workspace Builder Target Packet smoke passed."
