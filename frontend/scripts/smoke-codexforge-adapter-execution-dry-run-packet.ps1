param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 771 Adapter Execution Dry-Run Packet" `
  -ScriptFile "smoke-codexforge-adapter-execution-dry-run-packet.ps1" `
  -Domain "src\lib\codexforge\adapter-execution-dry-run-packet" `
  -Route "src\app\adapter-execution-dry-run-packet" `
  -MainPanel "AdapterExecutionDryRunPacketPanel" `
  -CommandLabel "Go to Adapter Execution Dry-Run Packet" `
  -Modules @("adapter-execution-dry-run-packet-model.ts", "index.ts") `
  -Components @("AdapterExecutionDryRunPacketPanel.tsx", "index.ts") `
  -Exports @("buildAdapterExecutionDryRunPacketStableKey", "buildAdapterExecutionDryRunPacket", "buildAdapterExecutionDryRunPacketItems", "buildAdapterExecutionDryRunPacketBoundary", "buildAdapterExecutionDryRunPacketModel", "summarizeAdapterExecutionDryRunPacket", "ADAPTER_EXECUTION_DRY_RUN_PACKET_LANGUAGE") `
  -PhaseMarkers @("Adapter Execution Dry-Run Packet", "Adapter execution dry-run packet does not execute adapters", "Adapter dry-runs require explicit operator approval", "dry-run packet fields", "simulated input", "expected output", "blocked side effects", "validation", "evidence", "result", "recovery", "audit") `
  -PlainEnglish @("Adapter Execution Dry-Run Packet identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not execute adapters") `
  -RouteHref "/adapter-execution-dry-run-packet"

Write-Host "[OK] CodexForge Phase 771 adapter execution dry-run packet smoke passed."
