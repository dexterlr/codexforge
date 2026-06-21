param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1147 Simulated Adapter Intent Packet" `
  -ScriptFile "smoke-codexforge-simulated-adapter-intent-packet.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-intent-packet" `
  -Route "src\app\simulated-adapter-intent-packet" `
  -MainPanel "SimulatedAdapterIntentPacketPanel" `
  -CommandLabel "Go to Simulated Adapter Intent Packet" `
  -Modules @("simulated-adapter-intent-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterIntentPacketStableKey", "buildSimulatedAdapterIntentPacket", "buildSimulatedAdapterIntentPacketItems", "buildSimulatedAdapterIntentPacketBoundary", "buildSimulatedAdapterIntentPacketModel", "summarizeSimulatedAdapterIntentPacket", "SIMULATED_ADAPTER_INTENT_PACKET_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter intent packet", "Simulated adapter intent packet does not send prompts", "Adapter intent review requires explicit operator approval", "Intent packets preserve shared CodexForge brain context", "Denied simulated adapter intent paths remain blocked", "Simulated adapter intent checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter intent packet does not send prompts", "Adapter intent review requires explicit operator approval", "Denied simulated adapter intent paths remain blocked") `
  -RouteHref "/simulated-adapter-intent-packet"

Write-Host "[OK] CodexForge Phase 1147 Simulated Adapter Intent Packet smoke passed."
