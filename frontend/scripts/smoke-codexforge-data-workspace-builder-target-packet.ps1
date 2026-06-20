param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 995 Data Workspace Builder Target Packet" `
  -ScriptFile "smoke-codexforge-data-workspace-builder-target-packet.ps1" `
  -Domain "src\lib\codexforge\data-workspace-builder-target-packet" `
  -Route "src\app\data-workspace-builder-target-packet" `
  -MainPanel "DataWorkspaceBuilderTargetPacketPanel" `
  -CommandLabel "Go to Data Workspace Builder Target Packet" `
  -Modules @("data-workspace-builder-target-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDataWorkspaceBuilderTargetPacketStableKey", "buildDataWorkspaceBuilderTargetPacket", "buildDataWorkspaceBuilderTargetPacketItems", "buildDataWorkspaceBuilderTargetPacketBoundary", "buildDataWorkspaceBuilderTargetPacketModel", "summarizeDataWorkspaceBuilderTargetPacket", "DATA_WORKSPACE_BUILDER_TARGET_PACKET_LANGUAGE") `
  -PhaseMarkers @("Data workspace builder target packet", "Data workspace builder target packet does not connect live data", "Data workspace building requires explicit operator approval", "Data packets include privacy ingestion and validation review", "Denied data workspace builder paths remain blocked", "Data workspace builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Data workspace builder target packet does not connect live data", "Data workspace building requires explicit operator approval", "Denied data workspace builder paths remain blocked") `
  -RouteHref "/data-workspace-builder-target-packet"

Write-Host "[OK] CodexForge Phase 995 Data Workspace Builder Target Packet smoke passed."
