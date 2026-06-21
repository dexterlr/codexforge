param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1115 Simulated Command Intent Packet" `
  -ScriptFile "smoke-codexforge-simulated-command-intent-packet.ps1" `
  -Domain "src\lib\codexforge\simulated-command-intent-packet" `
  -Route "src\app\simulated-command-intent-packet" `
  -MainPanel "SimulatedCommandIntentPacketPanel" `
  -CommandLabel "Go to Simulated Command Intent Packet" `
  -Modules @("simulated-command-intent-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandIntentPacketStableKey", "buildSimulatedCommandIntentPacket", "buildSimulatedCommandIntentPacketItems", "buildSimulatedCommandIntentPacketBoundary", "buildSimulatedCommandIntentPacketModel", "summarizeSimulatedCommandIntentPacket", "SIMULATED_COMMAND_INTENT_PACKET_LANGUAGE") `
  -PhaseMarkers @("Simulated command intent packet", "Simulated command intent packet does not send prompts", "Command intent review requires explicit operator approval", "Intent packets preserve shared CodexForge brain context", "Denied simulated command intent paths remain blocked", "Simulated command intent checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command intent packet does not send prompts", "Command intent review requires explicit operator approval", "Denied simulated command intent paths remain blocked") `
  -RouteHref "/simulated-command-intent-packet"

Write-Host "[OK] CodexForge Phase 1115 Simulated Command Intent Packet smoke passed."
