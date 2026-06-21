param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1104 Simulated File Patch Packet" `
  -ScriptFile "smoke-codexforge-simulated-file-patch-packet.ps1" `
  -Domain "src\lib\codexforge\simulated-file-patch-packet" `
  -Route "src\app\simulated-file-patch-packet" `
  -MainPanel "SimulatedFilePatchPacketPanel" `
  -CommandLabel "Go to Simulated File Patch Packet" `
  -Modules @("simulated-file-patch-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFilePatchPacketStableKey", "buildSimulatedFilePatchPacket", "buildSimulatedFilePatchPacketItems", "buildSimulatedFilePatchPacketBoundary", "buildSimulatedFilePatchPacketModel", "summarizeSimulatedFilePatchPacket", "SIMULATED_FILE_PATCH_PACKET_LANGUAGE") `
  -PhaseMarkers @("Simulated file patch packet", "Simulated file patch packet does not apply patches", "File patch review requires explicit operator approval", "Patch packets show planned patch application without mutation", "Denied simulated file patch paths remain blocked", "Simulated file patch checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file patch packet does not apply patches", "File patch review requires explicit operator approval", "Denied simulated file patch paths remain blocked") `
  -RouteHref "/simulated-file-patch-packet"

Write-Host "[OK] CodexForge Phase 1104 Simulated File Patch Packet smoke passed."
