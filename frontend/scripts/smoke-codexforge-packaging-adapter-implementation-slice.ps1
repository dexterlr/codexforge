param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 737 Packaging Adapter Implementation Slice" `
  -ScriptFile "smoke-codexforge-packaging-adapter-implementation-slice.ps1" `
  -Domain "src\lib\codexforge\packaging-adapter-implementation-slice" `
  -Route "src\app\packaging-adapter-implementation-slice" `
  -MainPanel "PackagingAdapterImplementationSlicePanel" `
  -CommandLabel "Go to Packaging Adapter Implementation Slice" `
  -Modules @("packaging-adapter-implementation-slice-model.ts", "index.ts") `
  -Components @("PackagingAdapterImplementationSlicePanel.tsx", "index.ts") `
  -Exports @("buildPackagingAdapterImplementationSliceStableKey", "buildPackagingAdapterImplementationSlice", "buildPackagingAdapterImplementationSliceItems", "buildPackagingAdapterImplementationSliceBoundary", "buildPackagingAdapterImplementationSliceModel", "summarizePackagingAdapterImplementationSlice", "PACKAGING_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE") `
  -PhaseMarkers @("Packaging Adapter Implementation Slice", "Packaging adapter implementation slice does not create packages or exports", "Packaging adapter implementation requires explicit operator approval", "Slice inputs", "Slice outputs", "Bundle policy", "Artifact policy", "Destination policy", "Redaction/license policy", "Handoff/rollback policy", "Sandbox boundary", "Validation matrix", "Unresolved blockers") `
  -PlainEnglish @("Packaging Adapter Implementation Slice identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "license review") `
  -RouteHref "/packaging-adapter-implementation-slice"

Write-Host "[OK] CodexForge Phase 737 packaging adapter implementation slice smoke passed."
