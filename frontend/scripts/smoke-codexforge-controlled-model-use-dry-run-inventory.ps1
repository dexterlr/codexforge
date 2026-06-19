param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 890 Controlled Model Use Dry-Run Inventory" `
  -ScriptFile "smoke-codexforge-controlled-model-use-dry-run-inventory.ps1" `
  -Domain "src\lib\codexforge\controlled-model-use-dry-run-inventory" `
  -Route "src\app\controlled-model-use-dry-run-inventory" `
  -MainPanel "ControlledModelUseDryRunInventoryPanel" `
  -CommandLabel "Go to Controlled Model Use Dry-Run Inventory" `
  -Modules @("controlled-model-use-dry-run-inventory-model.ts", "index.ts") `
  -Components @("ControlledModelUseDryRunInventoryPanel.tsx", "index.ts") `
  -Exports @("buildControlledModelUseDryRunInventoryStableKey", "buildControlledModelUseDryRunInventory", "buildControlledModelUseDryRunInventoryItems", "buildControlledModelUseDryRunInventoryBoundary", "buildControlledModelUseDryRunInventoryModel", "summarizeControlledModelUseDryRunInventory", "CONTROLLED_MODEL_USE_DRY_RUN_INVENTORY_LANGUAGE") `
  -PhaseMarkers @("Controlled model use dry-run inventory", "Controlled model use dry-run inventory does not call models", "Model-use dry-runs require explicit operator approval", "All model-use dry-runs share CodexForge brain context", "Denied model-use dry-run paths remain blocked", "Controlled model-use dry-run checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled model use dry-run inventory does not call models", "Model-use dry-runs require explicit operator approval", "Denied model-use dry-run paths remain blocked") `
  -RouteHref "/controlled-model-use-dry-run-inventory"

Write-Host "[OK] CodexForge Phase 890 Controlled model use dry-run inventory smoke passed."

