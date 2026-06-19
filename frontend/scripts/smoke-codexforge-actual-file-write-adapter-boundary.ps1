param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 762 Actual File Write Adapter Boundary" `
  -ScriptFile "smoke-codexforge-actual-file-write-adapter-boundary.ps1" `
  -Domain "src\lib\codexforge\actual-file-write-adapter-boundary" `
  -Route "src\app\actual-file-write-adapter-boundary" `
  -MainPanel "ActualFileWriteAdapterBoundaryPanel" `
  -CommandLabel "Go to Actual File Write Adapter Boundary" `
  -Modules @("actual-file-write-adapter-boundary-model.ts", "index.ts") `
  -Components @("ActualFileWriteAdapterBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildActualFileWriteAdapterBoundaryStableKey", "buildActualFileWriteAdapterBoundary", "buildActualFileWriteAdapterBoundaryItems", "buildActualFileWriteAdapterBoundaryBoundary", "buildActualFileWriteAdapterBoundaryModel", "summarizeActualFileWriteAdapterBoundary", "ACTUAL_FILE_WRITE_ADAPTER_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Actual File Write Adapter Boundary", "Actual file write adapter boundary does not write files from UI", "File write adapter execution requires explicit operator approval", "Boundary packet fields", "request id", "target path", "operation type", "diff preview", "approval state", "rollback plan", "audit link", "evidence link", "result link", "blocked actions", "what this unlocks next") `
  -PlainEnglish @("Actual File Write Adapter Boundary identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not write files from UI") `
  -RouteHref "/actual-file-write-adapter-boundary"

Write-Host "[OK] CodexForge Phase 762 actual file write adapter boundary smoke passed."
