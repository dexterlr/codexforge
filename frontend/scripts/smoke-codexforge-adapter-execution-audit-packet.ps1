param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 772 Adapter Execution Audit Packet" `
  -ScriptFile "smoke-codexforge-adapter-execution-audit-packet.ps1" `
  -Domain "src\lib\codexforge\adapter-execution-audit-packet" `
  -Route "src\app\adapter-execution-audit-packet" `
  -MainPanel "AdapterExecutionAuditPacketPanel" `
  -CommandLabel "Go to Adapter Execution Audit Packet" `
  -Modules @("adapter-execution-audit-packet-model.ts", "index.ts") `
  -Components @("AdapterExecutionAuditPacketPanel.tsx", "index.ts") `
  -Exports @("buildAdapterExecutionAuditPacketStableKey", "buildAdapterExecutionAuditPacket", "buildAdapterExecutionAuditPacketItems", "buildAdapterExecutionAuditPacketBoundary", "buildAdapterExecutionAuditPacketModel", "summarizeAdapterExecutionAuditPacket", "ADAPTER_EXECUTION_AUDIT_PACKET_LANGUAGE") `
  -PhaseMarkers @("Adapter Execution Audit Packet", "Adapter execution audit packet does not store audit events", "Audit persistence requires explicit operator approval", "audit packet fields", "actor", "request id", "adapter family", "approved operation", "denied operation", "evidence link", "result link", "recovery link", "redaction state", "retention state") `
  -PlainEnglish @("Adapter Execution Audit Packet identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not store audit events") `
  -RouteHref "/adapter-execution-audit-packet"

Write-Host "[OK] CodexForge Phase 772 adapter execution audit packet smoke passed."
