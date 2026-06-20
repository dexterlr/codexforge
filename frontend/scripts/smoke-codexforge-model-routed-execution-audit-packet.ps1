param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 948 Model-Routed Execution Audit Packet" `
  -ScriptFile "smoke-codexforge-model-routed-execution-audit-packet.ps1" `
  -Domain "src\lib\codexforge\model-routed-execution-audit-packet" `
  -Route "src\app\model-routed-execution-audit-packet" `
  -MainPanel "ModelRoutedExecutionAuditPacketPanel" `
  -CommandLabel "Go to Model-Routed Execution Audit Packet" `
  -Modules @("model-routed-execution-audit-packet-model.ts", "index.ts") `
  -Components @("ModelRoutedExecutionAuditPacketPanel.tsx", "index.ts") `
  -Exports @("buildModelRoutedExecutionAuditPacketStableKey", "buildModelRoutedExecutionAuditPacket", "buildModelRoutedExecutionAuditPacketItems", "buildModelRoutedExecutionAuditPacketBoundary", "buildModelRoutedExecutionAuditPacketModel", "summarizeModelRoutedExecutionAuditPacket", "MODEL_ROUTED_EXECUTION_AUDIT_PACKET_LANGUAGE") `
  -PhaseMarkers @("Model-routed execution audit packet", "Model-routed execution audit packet does not write audit records", "Audit capture requires explicit operator approval", "Audit packets include model and adapter rationale", "Denied model-routed audit paths remain blocked", "Model-routed audit checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model-routed execution audit packet does not write audit records", "Audit capture requires explicit operator approval", "Denied model-routed audit paths remain blocked") `
  -RouteHref "/model-routed-execution-audit-packet"

Write-Host "[OK] CodexForge Phase 948 Model-routed execution audit packet smoke passed."
