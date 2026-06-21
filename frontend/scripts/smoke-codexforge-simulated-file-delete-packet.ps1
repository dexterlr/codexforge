param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1102 Simulated File Delete Packet" `
  -ScriptFile "smoke-codexforge-simulated-file-delete-packet.ps1" `
  -Domain "src\lib\codexforge\simulated-file-delete-packet" `
  -Route "src\app\simulated-file-delete-packet" `
  -MainPanel "SimulatedFileDeletePacketPanel" `
  -CommandLabel "Go to Simulated File Delete Packet" `
  -Modules @("simulated-file-delete-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileDeletePacketStableKey", "buildSimulatedFileDeletePacket", "buildSimulatedFileDeletePacketItems", "buildSimulatedFileDeletePacketBoundary", "buildSimulatedFileDeletePacketModel", "summarizeSimulatedFileDeletePacket", "SIMULATED_FILE_DELETE_PACKET_LANGUAGE") `
  -PhaseMarkers @("Simulated file delete packet", "Simulated file delete packet does not delete files", "File delete review requires explicit operator approval", "Delete packets show planned file removal without mutation", "Denied simulated file delete paths remain blocked", "Simulated file delete checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file delete packet does not delete files", "File delete review requires explicit operator approval", "Denied simulated file delete paths remain blocked") `
  -RouteHref "/simulated-file-delete-packet"

Write-Host "[OK] CodexForge Phase 1102 Simulated File Delete Packet smoke passed."
