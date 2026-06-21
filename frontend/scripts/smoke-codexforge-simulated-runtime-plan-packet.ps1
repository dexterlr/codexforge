param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1132 Simulated Runtime Plan Packet" `
  -ScriptFile "smoke-codexforge-simulated-runtime-plan-packet.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-plan-packet" `
  -Route "src\app\simulated-runtime-plan-packet" `
  -MainPanel "SimulatedRuntimePlanPacketPanel" `
  -CommandLabel "Go to Simulated Runtime Plan Packet" `
  -Modules @("simulated-runtime-plan-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimePlanPacketStableKey", "buildSimulatedRuntimePlanPacket", "buildSimulatedRuntimePlanPacketItems", "buildSimulatedRuntimePlanPacketBoundary", "buildSimulatedRuntimePlanPacketModel", "summarizeSimulatedRuntimePlanPacket", "SIMULATED_RUNTIME_PLAN_PACKET_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime plan packet", "Simulated runtime plan packet does not start runtimes", "Runtime plan review requires explicit operator approval", "Runtime plans show planned launches without execution", "Denied simulated runtime plan paths remain blocked", "Simulated runtime plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime plan packet does not start runtimes", "Runtime plan review requires explicit operator approval", "Denied simulated runtime plan paths remain blocked") `
  -RouteHref "/simulated-runtime-plan-packet"

Write-Host "[OK] CodexForge Phase 1132 Simulated Runtime Plan Packet smoke passed."
