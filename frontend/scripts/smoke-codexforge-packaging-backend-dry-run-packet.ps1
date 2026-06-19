param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 833 Packaging Backend Dry-Run Packet" `
  -ScriptFile "smoke-codexforge-packaging-backend-dry-run-packet.ps1" `
  -Domain "src\lib\codexforge\packaging-backend-dry-run-packet" `
  -Route "src\app\packaging-backend-dry-run-packet" `
  -MainPanel "PackagingBackendDryRunPacketPanel" `
  -CommandLabel "Go to Packaging Backend Dry-Run Packet" `
  -Modules @("packaging-backend-dry-run-packet-model.ts", "index.ts") `
  -Components @("PackagingBackendDryRunPacketPanel.tsx", "index.ts") `
  -Exports @("buildPackagingBackendDryRunPacketStableKey", "buildPackagingBackendDryRunPacket", "buildPackagingBackendDryRunPacketItems", "buildPackagingBackendDryRunPacketBoundary", "buildPackagingBackendDryRunPacketModel", "summarizePackagingBackendDryRunPacket", "PACKAGING_BACKEND_DRY_RUN_PACKET_LANGUAGE") `
  -PhaseMarkers @("Packaging backend dry-run packet", "Packaging backend dry-run packet does not package or export", "Packaging dry-runs require explicit operator approval", "Denied packaging dry-run paths remain blocked", "Packaging dry-run groups", "Packaging dry-run checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Packaging backend dry-run packet does not package or export", "Packaging dry-runs require explicit operator approval", "Denied packaging dry-run paths remain blocked") `
  -RouteHref "/packaging-backend-dry-run-packet"

Write-Host "[OK] CodexForge Phase 833 Packaging backend dry-run packet smoke passed."
