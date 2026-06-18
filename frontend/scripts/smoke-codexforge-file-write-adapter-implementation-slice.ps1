param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 731 File Write Adapter Implementation Slice" `
  -ScriptFile "smoke-codexforge-file-write-adapter-implementation-slice.ps1" `
  -Domain "src\lib\codexforge\file-write-adapter-implementation-slice" `
  -Route "src\app\file-write-adapter-implementation-slice" `
  -MainPanel "FileWriteAdapterImplementationSlicePanel" `
  -CommandLabel "Go to File Write Adapter Implementation Slice" `
  -Modules @("file-write-adapter-implementation-slice-model.ts", "index.ts") `
  -Components @("FileWriteAdapterImplementationSlicePanel.tsx", "index.ts") `
  -Exports @("buildFileWriteAdapterImplementationSliceStableKey", "buildFileWriteAdapterImplementationSlice", "buildFileWriteAdapterImplementationSliceItems", "buildFileWriteAdapterImplementationSliceBoundary", "buildFileWriteAdapterImplementationSliceModel", "summarizeFileWriteAdapterImplementationSlice", "FILE_WRITE_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE") `
  -PhaseMarkers @("File Write Adapter Implementation Slice", "File write adapter implementation slice does not write files", "File write adapter implementation requires explicit operator approval", "Slice inputs", "Slice outputs", "Path policy", "Diff policy", "Rollback policy", "Audit policy", "Sandbox boundary", "Validation matrix", "Unresolved blockers") `
  -PlainEnglish @("File Write Adapter Implementation Slice identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "backend-owned file write request contract") `
  -RouteHref "/file-write-adapter-implementation-slice"

Write-Host "[OK] CodexForge Phase 731 file write adapter implementation slice smoke passed."
