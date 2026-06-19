param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 774 Adapter Execution Sandbox Packet" `
  -ScriptFile "smoke-codexforge-adapter-execution-sandbox-packet.ps1" `
  -Domain "src\lib\codexforge\adapter-execution-sandbox-packet" `
  -Route "src\app\adapter-execution-sandbox-packet" `
  -MainPanel "AdapterExecutionSandboxPacketPanel" `
  -CommandLabel "Go to Adapter Execution Sandbox Packet" `
  -Modules @("adapter-execution-sandbox-packet-model.ts", "index.ts") `
  -Components @("AdapterExecutionSandboxPacketPanel.tsx", "index.ts") `
  -Exports @("buildAdapterExecutionSandboxPacketStableKey", "buildAdapterExecutionSandboxPacket", "buildAdapterExecutionSandboxPacketItems", "buildAdapterExecutionSandboxPacketBoundary", "buildAdapterExecutionSandboxPacketModel", "summarizeAdapterExecutionSandboxPacket", "ADAPTER_EXECUTION_SANDBOX_PACKET_LANGUAGE") `
  -PhaseMarkers @("Adapter Execution Sandbox Packet", "Adapter execution sandbox packet does not run adapters", "Sandbox execution requires explicit operator approval", "sandbox packet fields", "allowed paths", "denied paths", "process policy", "network policy", "provider/connector/automation exclusions", "file/command/runtime boundaries", "evidence/result boundaries") `
  -PlainEnglish @("Adapter Execution Sandbox Packet identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not run adapters") `
  -RouteHref "/adapter-execution-sandbox-packet"

Write-Host "[OK] CodexForge Phase 774 adapter execution sandbox packet smoke passed."
