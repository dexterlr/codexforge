param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 829 Local Runtime Backend Dry-Run Packet" `
  -ScriptFile "smoke-codexforge-local-runtime-backend-dry-run-packet.ps1" `
  -Domain "src\lib\codexforge\local-runtime-backend-dry-run-packet" `
  -Route "src\app\local-runtime-backend-dry-run-packet" `
  -MainPanel "LocalRuntimeBackendDryRunPacketPanel" `
  -CommandLabel "Go to Local Runtime Backend Dry-Run Packet" `
  -Modules @("local-runtime-backend-dry-run-packet-model.ts", "index.ts") `
  -Components @("LocalRuntimeBackendDryRunPacketPanel.tsx", "index.ts") `
  -Exports @("buildLocalRuntimeBackendDryRunPacketStableKey", "buildLocalRuntimeBackendDryRunPacket", "buildLocalRuntimeBackendDryRunPacketItems", "buildLocalRuntimeBackendDryRunPacketBoundary", "buildLocalRuntimeBackendDryRunPacketModel", "summarizeLocalRuntimeBackendDryRunPacket", "LOCAL_RUNTIME_BACKEND_DRY_RUN_PACKET_LANGUAGE") `
  -PhaseMarkers @("Local runtime backend dry-run packet", "Local runtime backend dry-run packet does not start runtimes", "Runtime dry-runs require explicit operator approval", "Denied runtime dry-run paths remain blocked", "Runtime dry-run groups", "Runtime dry-run checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Local runtime backend dry-run packet does not start runtimes", "Runtime dry-runs require explicit operator approval", "Denied runtime dry-run paths remain blocked") `
  -RouteHref "/local-runtime-backend-dry-run-packet"

Write-Host "[OK] CodexForge Phase 829 Local runtime backend dry-run packet smoke passed."
