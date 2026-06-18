param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 735 Result Store Adapter Implementation Slice" `
  -ScriptFile "smoke-codexforge-result-store-adapter-implementation-slice.ps1" `
  -Domain "src\lib\codexforge\result-store-adapter-implementation-slice" `
  -Route "src\app\result-store-adapter-implementation-slice" `
  -MainPanel "ResultStoreAdapterImplementationSlicePanel" `
  -CommandLabel "Go to Result Store Adapter Implementation Slice" `
  -Modules @("result-store-adapter-implementation-slice-model.ts", "index.ts") `
  -Components @("ResultStoreAdapterImplementationSlicePanel.tsx", "index.ts") `
  -Exports @("buildResultStoreAdapterImplementationSliceStableKey", "buildResultStoreAdapterImplementationSlice", "buildResultStoreAdapterImplementationSliceItems", "buildResultStoreAdapterImplementationSliceBoundary", "buildResultStoreAdapterImplementationSliceModel", "summarizeResultStoreAdapterImplementationSlice", "RESULT_STORE_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE") `
  -PhaseMarkers @("Result Store Adapter Implementation Slice", "Result store adapter implementation slice does not store or reuse results", "Result store adapter implementation requires explicit operator approval", "Slice inputs", "Slice outputs", "Acceptance/rejection policy", "Reuse policy", "Privacy/safety policy", "Retention/audit policy", "Sandbox boundary", "Validation matrix", "Unresolved blockers") `
  -PlainEnglish @("Result Store Adapter Implementation Slice identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "reuse denied") `
  -RouteHref "/result-store-adapter-implementation-slice"

Write-Host "[OK] CodexForge Phase 735 result store adapter implementation slice smoke passed."
