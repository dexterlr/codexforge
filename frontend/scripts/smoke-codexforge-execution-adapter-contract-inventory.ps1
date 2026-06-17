param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 666 Execution Adapter Contract Inventory" `
  -ScriptFile "smoke-codexforge-execution-adapter-contract-inventory.ps1" `
  -Domain "src\lib\codexforge\execution-adapter-contract-inventory" `
  -Route "src\app\execution-adapter-contract-inventory" `
  -MainPanel "ExecutionAdapterContractInventoryPanel" `
  -CommandLabel "Go to Execution Adapter Contract Inventory" `
  -Modules @("execution-adapter-contract-inventory-model.ts", "index.ts") `
  -Components @("ExecutionAdapterContractInventoryPanel.tsx", "index.ts") `
  -Exports @("buildExecutionAdapterContractInventoryStableKey", "buildExecutionAdapterContractInventory", "buildExecutionAdapterContractInventories", "buildExecutionAdapterContractInventoryBoundary", "buildExecutionAdapterContractInventoryModel", "summarizeExecutionAdapterContractInventory", "EXECUTION_ADAPTER_CONTRACT_INVENTORY_LANGUAGE") `
  -PhaseMarkers @("Execution adapter contract inventory", "Execution adapter contract inventory does not implement or run adapters", "Adapter execution requires explicit operator approval", "Adapter not executable from UI", "Not implemented yet", "Adapter families", "Denied adapter actions", "Unresolved adapter blockers") `
  -PlainEnglish @("Execution adapter contract inventory identity", "Adapter families", "Input contract map", "Output contract map", "Approval requirements", "Denied adapter actions", "Audit needs", "Recovery needs", "Unresolved adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/execution-adapter-contract-inventory"

Write-Host "[OK] CodexForge Phase 666 execution adapter contract inventory smoke passed."
