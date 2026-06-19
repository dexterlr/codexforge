param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 826 Backend Adapter Dry-Run Packet Inventory" `
  -ScriptFile "smoke-codexforge-backend-adapter-dry-run-packet-inventory.ps1" `
  -Domain "src\lib\codexforge\backend-adapter-dry-run-packet-inventory" `
  -Route "src\app\backend-adapter-dry-run-packet-inventory" `
  -MainPanel "BackendAdapterDryRunPacketInventoryPanel" `
  -CommandLabel "Go to Backend Adapter Dry-Run Packet Inventory" `
  -Modules @("backend-adapter-dry-run-packet-inventory-model.ts", "index.ts") `
  -Components @("BackendAdapterDryRunPacketInventoryPanel.tsx", "index.ts") `
  -Exports @("buildBackendAdapterDryRunPacketInventoryStableKey", "buildBackendAdapterDryRunPacketInventory", "buildBackendAdapterDryRunPacketInventoryItems", "buildBackendAdapterDryRunPacketInventoryBoundary", "buildBackendAdapterDryRunPacketInventoryModel", "summarizeBackendAdapterDryRunPacketInventory", "BACKEND_ADAPTER_DRY_RUN_PACKET_INVENTORY_LANGUAGE") `
  -PhaseMarkers @("Backend adapter dry-run packet inventory", "Backend adapter dry-run packet inventory does not execute dry-runs", "Dry-run packets require explicit operator approval", "Denied dry-run packet paths remain blocked", "Dry-run packet groups", "Backend dry-run checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Backend adapter dry-run packet inventory does not execute dry-runs", "Dry-run packets require explicit operator approval", "Denied dry-run packet paths remain blocked") `
  -RouteHref "/backend-adapter-dry-run-packet-inventory"

Write-Host "[OK] CodexForge Phase 826 Backend adapter dry-run packet inventory smoke passed."
