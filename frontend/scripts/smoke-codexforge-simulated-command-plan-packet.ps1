param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1116 Simulated Command Plan Packet" `
  -ScriptFile "smoke-codexforge-simulated-command-plan-packet.ps1" `
  -Domain "src\lib\codexforge\simulated-command-plan-packet" `
  -Route "src\app\simulated-command-plan-packet" `
  -MainPanel "SimulatedCommandPlanPacketPanel" `
  -CommandLabel "Go to Simulated Command Plan Packet" `
  -Modules @("simulated-command-plan-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandPlanPacketStableKey", "buildSimulatedCommandPlanPacket", "buildSimulatedCommandPlanPacketItems", "buildSimulatedCommandPlanPacketBoundary", "buildSimulatedCommandPlanPacketModel", "summarizeSimulatedCommandPlanPacket", "SIMULATED_COMMAND_PLAN_PACKET_LANGUAGE") `
  -PhaseMarkers @("Simulated command plan packet", "Simulated command plan packet does not run commands", "Command plan review requires explicit operator approval", "Command plans show planned commands without execution", "Denied simulated command plan paths remain blocked", "Simulated command plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command plan packet does not run commands", "Command plan review requires explicit operator approval", "Denied simulated command plan paths remain blocked") `
  -RouteHref "/simulated-command-plan-packet"

Write-Host "[OK] CodexForge Phase 1116 Simulated Command Plan Packet smoke passed."
