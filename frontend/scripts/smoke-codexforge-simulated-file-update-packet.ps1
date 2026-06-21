param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1101 Simulated File Update Packet" `
  -ScriptFile "smoke-codexforge-simulated-file-update-packet.ps1" `
  -Domain "src\lib\codexforge\simulated-file-update-packet" `
  -Route "src\app\simulated-file-update-packet" `
  -MainPanel "SimulatedFileUpdatePacketPanel" `
  -CommandLabel "Go to Simulated File Update Packet" `
  -Modules @("simulated-file-update-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileUpdatePacketStableKey", "buildSimulatedFileUpdatePacket", "buildSimulatedFileUpdatePacketItems", "buildSimulatedFileUpdatePacketBoundary", "buildSimulatedFileUpdatePacketModel", "summarizeSimulatedFileUpdatePacket", "SIMULATED_FILE_UPDATE_PACKET_LANGUAGE") `
  -PhaseMarkers @("Simulated file update packet", "Simulated file update packet does not update files", "File update review requires explicit operator approval", "Update packets show planned file changes without mutation", "Denied simulated file update paths remain blocked", "Simulated file update checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file update packet does not update files", "File update review requires explicit operator approval", "Denied simulated file update paths remain blocked") `
  -RouteHref "/simulated-file-update-packet"

Write-Host "[OK] CodexForge Phase 1101 Simulated File Update Packet smoke passed."
