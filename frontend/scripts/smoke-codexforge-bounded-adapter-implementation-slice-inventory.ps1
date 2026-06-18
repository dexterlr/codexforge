param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 730 Bounded Adapter Implementation Slice Inventory" `
  -ScriptFile "smoke-codexforge-bounded-adapter-implementation-slice-inventory.ps1" `
  -Domain "src\lib\codexforge\bounded-adapter-implementation-slice-inventory" `
  -Route "src\app\bounded-adapter-implementation-slice-inventory" `
  -MainPanel "BoundedAdapterImplementationSliceInventoryPanel" `
  -CommandLabel "Go to Bounded Adapter Implementation Slice Inventory" `
  -Modules @("bounded-adapter-implementation-slice-inventory-model.ts", "index.ts") `
  -Components @("BoundedAdapterImplementationSliceInventoryPanel.tsx", "index.ts") `
  -Exports @("buildBoundedAdapterImplementationSliceInventoryStableKey", "buildBoundedAdapterImplementationSliceInventory", "buildBoundedAdapterImplementationSliceInventoryItems", "buildBoundedAdapterImplementationSliceInventoryBoundary", "buildBoundedAdapterImplementationSliceInventoryModel", "summarizeBoundedAdapterImplementationSliceInventory", "BOUNDED_ADAPTER_IMPLEMENTATION_SLICE_INVENTORY_LANGUAGE") `
  -PhaseMarkers @("Bounded Adapter Implementation Slice Inventory", "Bounded adapter implementation slice inventory does not implement or run adapters", "Bounded adapter implementation slices require explicit operator approval", "Slice groups", "Deferred slice groups", "Denied implementation actions", "Unresolved blockers") `
  -PlainEnglish @("Bounded Adapter Implementation Slice Inventory identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "practical bridge") `
  -RouteHref "/bounded-adapter-implementation-slice-inventory"

Write-Host "[OK] CodexForge Phase 730 bounded adapter implementation slice inventory smoke passed."
