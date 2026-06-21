param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1103 Simulated File Move Packet" `
  -ScriptFile "smoke-codexforge-simulated-file-move-packet.ps1" `
  -Domain "src\lib\codexforge\simulated-file-move-packet" `
  -Route "src\app\simulated-file-move-packet" `
  -MainPanel "SimulatedFileMovePacketPanel" `
  -CommandLabel "Go to Simulated File Move Packet" `
  -Modules @("simulated-file-move-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileMovePacketStableKey", "buildSimulatedFileMovePacket", "buildSimulatedFileMovePacketItems", "buildSimulatedFileMovePacketBoundary", "buildSimulatedFileMovePacketModel", "summarizeSimulatedFileMovePacket", "SIMULATED_FILE_MOVE_PACKET_LANGUAGE") `
  -PhaseMarkers @("Simulated file move packet", "Simulated file move packet does not move files", "File move review requires explicit operator approval", "Move packets show planned file moves without mutation", "Denied simulated file move paths remain blocked", "Simulated file move checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file move packet does not move files", "File move review requires explicit operator approval", "Denied simulated file move paths remain blocked") `
  -RouteHref "/simulated-file-move-packet"

Write-Host "[OK] CodexForge Phase 1103 Simulated File Move Packet smoke passed."
