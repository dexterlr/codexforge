param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 765 Actual Evidence Store Boundary" `
  -ScriptFile "smoke-codexforge-actual-evidence-store-boundary.ps1" `
  -Domain "src\lib\codexforge\actual-evidence-store-boundary" `
  -Route "src\app\actual-evidence-store-boundary" `
  -MainPanel "ActualEvidenceStoreBoundaryPanel" `
  -CommandLabel "Go to Actual Evidence Store Boundary" `
  -Modules @("actual-evidence-store-boundary-model.ts", "index.ts") `
  -Components @("ActualEvidenceStoreBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildActualEvidenceStoreBoundaryStableKey", "buildActualEvidenceStoreBoundary", "buildActualEvidenceStoreBoundaryItems", "buildActualEvidenceStoreBoundaryBoundary", "buildActualEvidenceStoreBoundaryModel", "summarizeActualEvidenceStoreBoundary", "ACTUAL_EVIDENCE_STORE_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Actual Evidence Store Boundary", "Actual evidence store boundary does not store or ingest evidence from UI", "Evidence storage requires explicit operator approval", "Boundary packet fields", "evidence source", "citation", "redaction status", "retention class", "privacy status", "approval state", "audit link", "result link", "blocked actions") `
  -PlainEnglish @("Actual Evidence Store Boundary identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not store or ingest evidence from UI") `
  -RouteHref "/actual-evidence-store-boundary"

Write-Host "[OK] CodexForge Phase 765 actual evidence store boundary smoke passed."
