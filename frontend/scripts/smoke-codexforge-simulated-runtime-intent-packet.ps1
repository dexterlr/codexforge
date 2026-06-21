param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1131 Simulated Runtime Intent Packet" `
  -ScriptFile "smoke-codexforge-simulated-runtime-intent-packet.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-intent-packet" `
  -Route "src\app\simulated-runtime-intent-packet" `
  -MainPanel "SimulatedRuntimeIntentPacketPanel" `
  -CommandLabel "Go to Simulated Runtime Intent Packet" `
  -Modules @("simulated-runtime-intent-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimeIntentPacketStableKey", "buildSimulatedRuntimeIntentPacket", "buildSimulatedRuntimeIntentPacketItems", "buildSimulatedRuntimeIntentPacketBoundary", "buildSimulatedRuntimeIntentPacketModel", "summarizeSimulatedRuntimeIntentPacket", "SIMULATED_RUNTIME_INTENT_PACKET_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime intent packet", "Simulated runtime intent packet does not send prompts", "Runtime intent review requires explicit operator approval", "Intent packets preserve shared CodexForge brain context", "Denied simulated runtime intent paths remain blocked", "Simulated runtime intent checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime intent packet does not send prompts", "Runtime intent review requires explicit operator approval", "Denied simulated runtime intent paths remain blocked") `
  -RouteHref "/simulated-runtime-intent-packet"

Write-Host "[OK] CodexForge Phase 1131 Simulated Runtime Intent Packet smoke passed."
