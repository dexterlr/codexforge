param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 770 Adapter Execution Approval Packet" `
  -ScriptFile "smoke-codexforge-adapter-execution-approval-packet.ps1" `
  -Domain "src\lib\codexforge\adapter-execution-approval-packet" `
  -Route "src\app\adapter-execution-approval-packet" `
  -MainPanel "AdapterExecutionApprovalPacketPanel" `
  -CommandLabel "Go to Adapter Execution Approval Packet" `
  -Modules @("adapter-execution-approval-packet-model.ts", "index.ts") `
  -Components @("AdapterExecutionApprovalPacketPanel.tsx", "index.ts") `
  -Exports @("buildAdapterExecutionApprovalPacketStableKey", "buildAdapterExecutionApprovalPacket", "buildAdapterExecutionApprovalPacketItems", "buildAdapterExecutionApprovalPacketBoundary", "buildAdapterExecutionApprovalPacketModel", "summarizeAdapterExecutionApprovalPacket", "ADAPTER_EXECUTION_APPROVAL_PACKET_LANGUAGE") `
  -PhaseMarkers @("Adapter Execution Approval Packet", "Adapter execution approval packet does not approve or execute adapters", "Adapter execution approval requires explicit operator approval", "approval packet fields", "reviewer checklist", "denial reasons", "expiration", "audit", "evidence", "rollback requirements") `
  -PlainEnglish @("Adapter Execution Approval Packet identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not approve or execute adapters") `
  -RouteHref "/adapter-execution-approval-packet"

Write-Host "[OK] CodexForge Phase 770 adapter execution approval packet smoke passed."
