param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 625 Evidence Capture Boundary" `
  -ScriptFile "smoke-codexforge-evidence-capture-boundary.ps1" `
  -Domain "src\lib\codexforge\evidence-capture-boundary" `
  -Route "src\app\evidence-capture-boundary" `
  -MainPanel "EvidenceCaptureBoundaryPanel" `
  -CommandLabel "Go to Evidence Capture Boundary" `
  -Modules @("evidence-capture-boundary-types.ts", "evidence-capture-boundary-summary.ts", "index.ts") `
  -Components @("EvidenceCaptureBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildEvidenceCaptureBoundaryStableKey", "buildEvidenceCaptureBoundary", "buildEvidenceCaptureBoundaries", "buildEvidenceCaptureBoundaryBoundary", "buildEvidenceCaptureBoundaryModel", "summarizeEvidenceCaptureBoundary", "EVIDENCE_CAPTURE_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Evidence capture boundary", "Evidence capture boundary does not capture or ingest evidence automatically", "Evidence capture requires explicit operator approval", "Private evidence stays redacted", "Evidence groups", "Retention checklist") `
  -PlainEnglish @("Evidence capture boundary identity", "Log/source checklist", "Citation checklist", "Redaction/privacy checklist", "Denied evidence actions", "Unresolved evidence blockers", "Result review boundary route", "Recovery boundary route", "Next recommended action") `
  -RouteHref "/evidence-capture-boundary"

Write-Host "[OK] CodexForge Phase 625 evidence capture boundary smoke passed."
