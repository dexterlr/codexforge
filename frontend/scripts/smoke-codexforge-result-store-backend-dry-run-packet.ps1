param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 831 Result Store Backend Dry-Run Packet" `
  -ScriptFile "smoke-codexforge-result-store-backend-dry-run-packet.ps1" `
  -Domain "src\lib\codexforge\result-store-backend-dry-run-packet" `
  -Route "src\app\result-store-backend-dry-run-packet" `
  -MainPanel "ResultStoreBackendDryRunPacketPanel" `
  -CommandLabel "Go to Result Store Backend Dry-Run Packet" `
  -Modules @("result-store-backend-dry-run-packet-model.ts", "index.ts") `
  -Components @("ResultStoreBackendDryRunPacketPanel.tsx", "index.ts") `
  -Exports @("buildResultStoreBackendDryRunPacketStableKey", "buildResultStoreBackendDryRunPacket", "buildResultStoreBackendDryRunPacketItems", "buildResultStoreBackendDryRunPacketBoundary", "buildResultStoreBackendDryRunPacketModel", "summarizeResultStoreBackendDryRunPacket", "RESULT_STORE_BACKEND_DRY_RUN_PACKET_LANGUAGE") `
  -PhaseMarkers @("Result store backend dry-run packet", "Result store backend dry-run packet does not persist results", "Result dry-runs require explicit operator approval", "Denied result dry-run paths remain blocked", "Result dry-run groups", "Result dry-run checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Result store backend dry-run packet does not persist results", "Result dry-runs require explicit operator approval", "Denied result dry-run paths remain blocked") `
  -RouteHref "/result-store-backend-dry-run-packet"

Write-Host "[OK] CodexForge Phase 831 Result store backend dry-run packet smoke passed."
