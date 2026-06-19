param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 872 Model Output Evidence Packet" `
  -ScriptFile "smoke-codexforge-model-output-evidence-packet.ps1" `
  -Domain "src\lib\codexforge\model-output-evidence-packet" `
  -Route "src\app\model-output-evidence-packet" `
  -MainPanel "ModelOutputEvidencePacketPanel" `
  -CommandLabel "Go to Model Output Evidence Packet" `
  -Modules @("model-output-evidence-packet-model.ts", "index.ts") `
  -Components @("ModelOutputEvidencePacketPanel.tsx", "index.ts") `
  -Exports @("buildModelOutputEvidencePacketStableKey", "buildModelOutputEvidencePacket", "buildModelOutputEvidencePacketItems", "buildModelOutputEvidencePacketBoundary", "buildModelOutputEvidencePacketModel", "summarizeModelOutputEvidencePacket", "MODEL_OUTPUT_EVIDENCE_PACKET_LANGUAGE") `
  -PhaseMarkers @("Model output evidence packet", "Model output evidence packet does not persist model outputs", "Output evidence capture requires explicit operator approval", "Model outputs return through shared evidence review", "Denied output evidence paths remain blocked", "Output evidence packet checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model output evidence packet does not persist model outputs", "Output evidence capture requires explicit operator approval", "Denied output evidence paths remain blocked") `
  -RouteHref "/model-output-evidence-packet"

Write-Host "[OK] CodexForge Phase 872 Model output evidence packet smoke passed."
