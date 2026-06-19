param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 773 Adapter Execution Failure Packet" `
  -ScriptFile "smoke-codexforge-adapter-execution-failure-packet.ps1" `
  -Domain "src\lib\codexforge\adapter-execution-failure-packet" `
  -Route "src\app\adapter-execution-failure-packet" `
  -MainPanel "AdapterExecutionFailurePacketPanel" `
  -CommandLabel "Go to Adapter Execution Failure Packet" `
  -Modules @("adapter-execution-failure-packet-model.ts", "index.ts") `
  -Components @("AdapterExecutionFailurePacketPanel.tsx", "index.ts") `
  -Exports @("buildAdapterExecutionFailurePacketStableKey", "buildAdapterExecutionFailurePacket", "buildAdapterExecutionFailurePacketItems", "buildAdapterExecutionFailurePacketBoundary", "buildAdapterExecutionFailurePacketModel", "summarizeAdapterExecutionFailurePacket", "ADAPTER_EXECUTION_FAILURE_PACKET_LANGUAGE") `
  -PhaseMarkers @("Adapter Execution Failure Packet", "Adapter execution failure packet does not trigger recovery or retry", "Failure handling requires explicit operator approval", "failure packet fields", "failure class", "affected adapter", "evidence link", "result link", "rollback target", "retry scope", "escalation", "blocked actions") `
  -PlainEnglish @("Adapter Execution Failure Packet identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not trigger recovery or retry") `
  -RouteHref "/adapter-execution-failure-packet"

Write-Host "[OK] CodexForge Phase 773 adapter execution failure packet smoke passed."
