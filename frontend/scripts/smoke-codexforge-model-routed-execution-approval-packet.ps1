param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 947 Model-Routed Execution Approval Packet" `
  -ScriptFile "smoke-codexforge-model-routed-execution-approval-packet.ps1" `
  -Domain "src\lib\codexforge\model-routed-execution-approval-packet" `
  -Route "src\app\model-routed-execution-approval-packet" `
  -MainPanel "ModelRoutedExecutionApprovalPacketPanel" `
  -CommandLabel "Go to Model-Routed Execution Approval Packet" `
  -Modules @("model-routed-execution-approval-packet-model.ts", "index.ts") `
  -Components @("ModelRoutedExecutionApprovalPacketPanel.tsx", "index.ts") `
  -Exports @("buildModelRoutedExecutionApprovalPacketStableKey", "buildModelRoutedExecutionApprovalPacket", "buildModelRoutedExecutionApprovalPacketItems", "buildModelRoutedExecutionApprovalPacketBoundary", "buildModelRoutedExecutionApprovalPacketModel", "summarizeModelRoutedExecutionApprovalPacket", "MODEL_ROUTED_EXECUTION_APPROVAL_PACKET_LANGUAGE") `
  -PhaseMarkers @("Model-routed execution approval packet", "Model-routed execution approval packet does not approve actions", "Execution approval requires explicit operator approval", "Approval packets include model and adapter rationale", "Denied model-routed approval paths remain blocked", "Model-routed approval checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model-routed execution approval packet does not approve actions", "Execution approval requires explicit operator approval", "Denied model-routed approval paths remain blocked") `
  -RouteHref "/model-routed-execution-approval-packet"

Write-Host "[OK] CodexForge Phase 947 Model-routed execution approval packet smoke passed."
