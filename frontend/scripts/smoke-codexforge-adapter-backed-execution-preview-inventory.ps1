param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 682 Adapter-Backed Execution Preview Inventory" `
  -ScriptFile "smoke-codexforge-adapter-backed-execution-preview-inventory.ps1" `
  -Domain "src\\lib\\codexforge\\adapter-backed-execution-preview-inventory" `
  -Route "src\\app\\adapter-backed-execution-preview-inventory" `
  -MainPanel "AdapterBackedExecutionPreviewInventoryPanel" `
  -CommandLabel "Go to Adapter-Backed Execution Preview Inventory" `
  -Modules @("adapter-backed-execution-preview-inventory-model.ts", "index.ts") `
  -Components @("AdapterBackedExecutionPreviewInventoryPanel.tsx", "index.ts") `
  -Exports @("buildAdapterBackedExecutionPreviewInventoryStableKey", "buildAdapterBackedExecutionPreviewInventory", "buildAdapterBackedExecutionPreviewInventories", "buildAdapterBackedExecutionPreviewInventoryBoundary", "buildAdapterBackedExecutionPreviewInventoryModel", "summarizeAdapterBackedExecutionPreviewInventory", "ADAPTER_BACKED_EXECUTION_PREVIEW_INVENTORY_LANGUAGE") `
  -PhaseMarkers @("Adapter-backed execution preview inventory", "Adapter-backed execution preview inventory does not run adapters", "Adapter-backed execution previews require explicit operator approval", "Preview families", "Denied preview actions", "Unresolved blockers", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Adapter-backed execution preview inventory identity", "Preview families", "Approved execution shape", "Expected outputs", "Approvals and evidence", "Result handling and recovery", "Denied preview actions", "Unresolved blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/adapter-backed-execution-preview-inventory"

Write-Host "[OK] CodexForge Phase 682 adapter-backed execution preview inventory smoke passed."
