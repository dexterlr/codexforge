param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 830 Evidence Store Backend Dry-Run Packet" `
  -ScriptFile "smoke-codexforge-evidence-store-backend-dry-run-packet.ps1" `
  -Domain "src\lib\codexforge\evidence-store-backend-dry-run-packet" `
  -Route "src\app\evidence-store-backend-dry-run-packet" `
  -MainPanel "EvidenceStoreBackendDryRunPacketPanel" `
  -CommandLabel "Go to Evidence Store Backend Dry-Run Packet" `
  -Modules @("evidence-store-backend-dry-run-packet-model.ts", "index.ts") `
  -Components @("EvidenceStoreBackendDryRunPacketPanel.tsx", "index.ts") `
  -Exports @("buildEvidenceStoreBackendDryRunPacketStableKey", "buildEvidenceStoreBackendDryRunPacket", "buildEvidenceStoreBackendDryRunPacketItems", "buildEvidenceStoreBackendDryRunPacketBoundary", "buildEvidenceStoreBackendDryRunPacketModel", "summarizeEvidenceStoreBackendDryRunPacket", "EVIDENCE_STORE_BACKEND_DRY_RUN_PACKET_LANGUAGE") `
  -PhaseMarkers @("Evidence store backend dry-run packet", "Evidence store backend dry-run packet does not persist evidence", "Evidence dry-runs require explicit operator approval", "Denied evidence dry-run paths remain blocked", "Evidence dry-run groups", "Evidence dry-run checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Evidence store backend dry-run packet does not persist evidence", "Evidence dry-runs require explicit operator approval", "Denied evidence dry-run paths remain blocked") `
  -RouteHref "/evidence-store-backend-dry-run-packet"

Write-Host "[OK] CodexForge Phase 830 Evidence store backend dry-run packet smoke passed."
