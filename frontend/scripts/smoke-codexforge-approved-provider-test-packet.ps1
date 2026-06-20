param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 907 Approved Provider Test Packet" `
  -ScriptFile "smoke-codexforge-approved-provider-test-packet.ps1" `
  -Domain "src\lib\codexforge\approved-provider-test-packet" `
  -Route "src\app\approved-provider-test-packet" `
  -MainPanel "ApprovedProviderTestPacketPanel" `
  -CommandLabel "Go to Approved Provider Test Packet" `
  -Modules @("approved-provider-test-packet-model.ts", "index.ts") `
  -Components @("ApprovedProviderTestPacketPanel.tsx", "index.ts") `
  -Exports @("buildApprovedProviderTestPacketStableKey", "buildApprovedProviderTestPacket", "buildApprovedProviderTestPacketItems", "buildApprovedProviderTestPacketBoundary", "buildApprovedProviderTestPacketModel", "summarizeApprovedProviderTestPacket", "APPROVED_PROVIDER_TEST_PACKET_LANGUAGE") `
  -PhaseMarkers @("Approved provider test packet", "Approved provider test packet does not call providers", "Provider tests require explicit operator approval", "Provider test packets use shared CodexForge context", "Denied provider test paths remain blocked", "Approved provider test checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Approved provider test packet does not call providers", "Provider tests require explicit operator approval", "Denied provider test paths remain blocked") `
  -RouteHref "/approved-provider-test-packet"

Write-Host "[OK] CodexForge Phase 907 approved provider test packet smoke passed."
