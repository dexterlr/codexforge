param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 768 Actual Packaging Boundary" `
  -ScriptFile "smoke-codexforge-actual-packaging-boundary.ps1" `
  -Domain "src\lib\codexforge\actual-packaging-boundary" `
  -Route "src\app\actual-packaging-boundary" `
  -MainPanel "ActualPackagingBoundaryPanel" `
  -CommandLabel "Go to Actual Packaging Boundary" `
  -Modules @("actual-packaging-boundary-model.ts", "index.ts") `
  -Components @("ActualPackagingBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildActualPackagingBoundaryStableKey", "buildActualPackagingBoundary", "buildActualPackagingBoundaryItems", "buildActualPackagingBoundaryBoundary", "buildActualPackagingBoundaryModel", "summarizeActualPackagingBoundary", "ACTUAL_PACKAGING_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Actual Packaging Boundary", "Actual packaging boundary does not create packages or exports from UI", "Packaging/export execution requires explicit operator approval", "Boundary packet fields", "artifact source", "bundle type", "destination", "redaction/license state", "handoff state", "rollback plan", "approval state", "audit/evidence/result links", "blocked actions") `
  -PlainEnglish @("Actual Packaging Boundary identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not create packages or exports from UI") `
  -RouteHref "/actual-packaging-boundary"

Write-Host "[OK] CodexForge Phase 768 actual packaging boundary smoke passed."
