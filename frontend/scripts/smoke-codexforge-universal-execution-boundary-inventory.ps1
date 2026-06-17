param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 618 Universal Execution Boundary Inventory" `
  -ScriptFile "smoke-codexforge-universal-execution-boundary-inventory.ps1" `
  -Domain "src\lib\codexforge\universal-execution-boundary-inventory" `
  -Route "src\app\universal-execution-boundary-inventory" `
  -MainPanel "UniversalExecutionBoundaryInventoryPanel" `
  -CommandLabel "Go to Universal Execution Boundary Inventory" `
  -Modules @("universal-execution-boundary-inventory-types.ts", "universal-execution-boundary-inventory-summary.ts", "index.ts") `
  -Components @("UniversalExecutionBoundaryInventoryPanel.tsx", "index.ts") `
  -Exports @("buildUniversalExecutionBoundaryInventoryStableKey", "buildUniversalExecutionBoundaryInventory", "buildUniversalExecutionBoundaryInventories", "buildUniversalExecutionBoundaryInventoryBoundary", "buildUniversalExecutionBoundaryInventoryModel", "summarizeUniversalExecutionBoundaryInventory", "UNIVERSAL_EXECUTION_BOUNDARY_INVENTORY_LANGUAGE") `
  -PhaseMarkers @("Universal execution boundary inventory", "Universal execution boundary inventory does not execute actions", "Execution requires explicit operator approval", "Unresolved execution boundary blockers stay blocked", "Execution family groups", "File write boundary") `
  -PlainEnglish @("Boundary inventory identity", "Command boundary", "Local runtime boundary", "Provider/model boundary", "Connector boundary", "Automation/schedule boundary", "Evidence/result/recovery/export boundaries", "Denied inventory actions", "Unresolved inventory blockers", "Next recommended action") `
  -RouteHref "/universal-execution-boundary-inventory"

Write-Host "[OK] CodexForge Phase 618 universal execution boundary inventory smoke passed."
