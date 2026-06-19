param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 840 Model Selection Approval Packet" `
  -ScriptFile "smoke-codexforge-model-selection-approval-packet.ps1" `
  -Domain "src\lib\codexforge\model-selection-approval-packet" `
  -Route "src\app\model-selection-approval-packet" `
  -MainPanel "ModelSelectionApprovalPacketPanel" `
  -CommandLabel "Go to Model Selection Approval Packet" `
  -Modules @("model-selection-approval-packet-model.ts", "index.ts") `
  -Components @("ModelSelectionApprovalPacketPanel.tsx", "index.ts") `
  -Exports @("buildModelSelectionApprovalPacketStableKey", "buildModelSelectionApprovalPacket", "buildModelSelectionApprovalPacketItems", "buildModelSelectionApprovalPacketBoundary", "buildModelSelectionApprovalPacketModel", "summarizeModelSelectionApprovalPacket", "MODEL_SELECTION_APPROVAL_PACKET_LANGUAGE") `
  -PhaseMarkers @("Model selection approval packet", "Model selection approval packet does not approve model calls", "Model selection requires explicit operator approval", "Denied model approval shortcuts remain blocked", "Model approval groups", "Model approval checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model selection approval packet does not approve model calls", "Model selection requires explicit operator approval", "Denied model approval shortcuts remain blocked") `
  -RouteHref "/model-selection-approval-packet"

Write-Host "[OK] CodexForge Phase 840 Model selection approval packet smoke passed."
