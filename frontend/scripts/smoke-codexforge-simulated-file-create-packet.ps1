param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1100 Simulated File Create Packet" `
  -ScriptFile "smoke-codexforge-simulated-file-create-packet.ps1" `
  -Domain "src\lib\codexforge\simulated-file-create-packet" `
  -Route "src\app\simulated-file-create-packet" `
  -MainPanel "SimulatedFileCreatePacketPanel" `
  -CommandLabel "Go to Simulated File Create Packet" `
  -Modules @("simulated-file-create-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileCreatePacketStableKey", "buildSimulatedFileCreatePacket", "buildSimulatedFileCreatePacketItems", "buildSimulatedFileCreatePacketBoundary", "buildSimulatedFileCreatePacketModel", "summarizeSimulatedFileCreatePacket", "SIMULATED_FILE_CREATE_PACKET_LANGUAGE") `
  -PhaseMarkers @("Simulated file create packet", "Simulated file create packet does not create files", "File create review requires explicit operator approval", "Create packets show planned file creation without mutation", "Denied simulated file create paths remain blocked", "Simulated file create checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file create packet does not create files", "File create review requires explicit operator approval", "Denied simulated file create paths remain blocked") `
  -RouteHref "/simulated-file-create-packet"

Write-Host "[OK] CodexForge Phase 1100 Simulated File Create Packet smoke passed."
