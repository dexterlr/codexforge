param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1099 Simulated File Diff Packet" `
  -ScriptFile "smoke-codexforge-simulated-file-diff-packet.ps1" `
  -Domain "src\lib\codexforge\simulated-file-diff-packet" `
  -Route "src\app\simulated-file-diff-packet" `
  -MainPanel "SimulatedFileDiffPacketPanel" `
  -CommandLabel "Go to Simulated File Diff Packet" `
  -Modules @("simulated-file-diff-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileDiffPacketStableKey", "buildSimulatedFileDiffPacket", "buildSimulatedFileDiffPacketItems", "buildSimulatedFileDiffPacketBoundary", "buildSimulatedFileDiffPacketModel", "summarizeSimulatedFileDiffPacket", "SIMULATED_FILE_DIFF_PACKET_LANGUAGE") `
  -PhaseMarkers @("Simulated file diff packet", "Simulated file diff packet does not apply diffs", "File diff review requires explicit operator approval", "Diff packets show planned mutations without applying them", "Denied simulated file diff paths remain blocked", "Simulated file diff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file diff packet does not apply diffs", "File diff review requires explicit operator approval", "Denied simulated file diff paths remain blocked") `
  -RouteHref "/simulated-file-diff-packet"

Write-Host "[OK] CodexForge Phase 1099 Simulated File Diff Packet smoke passed."
