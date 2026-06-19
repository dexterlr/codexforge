param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 827 File Write Backend Dry-Run Packet" `
  -ScriptFile "smoke-codexforge-file-write-backend-dry-run-packet.ps1" `
  -Domain "src\lib\codexforge\file-write-backend-dry-run-packet" `
  -Route "src\app\file-write-backend-dry-run-packet" `
  -MainPanel "FileWriteBackendDryRunPacketPanel" `
  -CommandLabel "Go to File Write Backend Dry-Run Packet" `
  -Modules @("file-write-backend-dry-run-packet-model.ts", "index.ts") `
  -Components @("FileWriteBackendDryRunPacketPanel.tsx", "index.ts") `
  -Exports @("buildFileWriteBackendDryRunPacketStableKey", "buildFileWriteBackendDryRunPacket", "buildFileWriteBackendDryRunPacketItems", "buildFileWriteBackendDryRunPacketBoundary", "buildFileWriteBackendDryRunPacketModel", "summarizeFileWriteBackendDryRunPacket", "FILE_WRITE_BACKEND_DRY_RUN_PACKET_LANGUAGE") `
  -PhaseMarkers @("File write backend dry-run packet", "File write backend dry-run packet does not write files", "File write dry-runs require explicit operator approval", "Denied file write dry-run paths remain blocked", "File write dry-run groups", "File write dry-run checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "File write backend dry-run packet does not write files", "File write dry-runs require explicit operator approval", "Denied file write dry-run paths remain blocked") `
  -RouteHref "/file-write-backend-dry-run-packet"

Write-Host "[OK] CodexForge Phase 827 File write backend dry-run packet smoke passed."
