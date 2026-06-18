param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 734 Evidence Store Adapter Implementation Slice" `
  -ScriptFile "smoke-codexforge-evidence-store-adapter-implementation-slice.ps1" `
  -Domain "src\lib\codexforge\evidence-store-adapter-implementation-slice" `
  -Route "src\app\evidence-store-adapter-implementation-slice" `
  -MainPanel "EvidenceStoreAdapterImplementationSlicePanel" `
  -CommandLabel "Go to Evidence Store Adapter Implementation Slice" `
  -Modules @("evidence-store-adapter-implementation-slice-model.ts", "index.ts") `
  -Components @("EvidenceStoreAdapterImplementationSlicePanel.tsx", "index.ts") `
  -Exports @("buildEvidenceStoreAdapterImplementationSliceStableKey", "buildEvidenceStoreAdapterImplementationSlice", "buildEvidenceStoreAdapterImplementationSliceItems", "buildEvidenceStoreAdapterImplementationSliceBoundary", "buildEvidenceStoreAdapterImplementationSliceModel", "summarizeEvidenceStoreAdapterImplementationSlice", "EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE") `
  -PhaseMarkers @("Evidence Store Adapter Implementation Slice", "Evidence store adapter implementation slice does not store or ingest evidence", "Evidence store adapter implementation requires explicit operator approval", "Slice inputs", "Slice outputs", "Citation policy", "Redaction policy", "Retention policy", "Privacy/audit policy", "Sandbox boundary", "Validation matrix", "Unresolved blockers") `
  -PlainEnglish @("Evidence Store Adapter Implementation Slice identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "citation schema") `
  -RouteHref "/evidence-store-adapter-implementation-slice"

Write-Host "[OK] CodexForge Phase 734 evidence store adapter implementation slice smoke passed."
