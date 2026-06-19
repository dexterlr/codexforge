param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 832 Recovery Backend Dry-Run Packet" `
  -ScriptFile "smoke-codexforge-recovery-backend-dry-run-packet.ps1" `
  -Domain "src\lib\codexforge\recovery-backend-dry-run-packet" `
  -Route "src\app\recovery-backend-dry-run-packet" `
  -MainPanel "RecoveryBackendDryRunPacketPanel" `
  -CommandLabel "Go to Recovery Backend Dry-Run Packet" `
  -Modules @("recovery-backend-dry-run-packet-model.ts", "index.ts") `
  -Components @("RecoveryBackendDryRunPacketPanel.tsx", "index.ts") `
  -Exports @("buildRecoveryBackendDryRunPacketStableKey", "buildRecoveryBackendDryRunPacket", "buildRecoveryBackendDryRunPacketItems", "buildRecoveryBackendDryRunPacketBoundary", "buildRecoveryBackendDryRunPacketModel", "summarizeRecoveryBackendDryRunPacket", "RECOVERY_BACKEND_DRY_RUN_PACKET_LANGUAGE") `
  -PhaseMarkers @("Recovery backend dry-run packet", "Recovery backend dry-run packet does not trigger recovery", "Recovery dry-runs require explicit operator approval", "Denied recovery dry-run paths remain blocked", "Recovery dry-run groups", "Recovery dry-run checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Recovery backend dry-run packet does not trigger recovery", "Recovery dry-runs require explicit operator approval", "Denied recovery dry-run paths remain blocked") `
  -RouteHref "/recovery-backend-dry-run-packet"

Write-Host "[OK] CodexForge Phase 832 Recovery backend dry-run packet smoke passed."
