param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 628 Packaging Export Boundary" `
  -ScriptFile "smoke-codexforge-packaging-export-boundary.ps1" `
  -Domain "src\lib\codexforge\packaging-export-boundary" `
  -Route "src\app\packaging-export-boundary" `
  -MainPanel "PackagingExportBoundaryPanel" `
  -CommandLabel "Go to Packaging Export Boundary" `
  -Modules @("packaging-export-boundary-types.ts", "packaging-export-boundary-summary.ts", "index.ts") `
  -Components @("PackagingExportBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildPackagingExportBoundaryStableKey", "buildPackagingExportBoundary", "buildPackagingExportBoundaries", "buildPackagingExportBoundaryBoundary", "buildPackagingExportBoundaryModel", "summarizePackagingExportBoundary", "PACKAGING_EXPORT_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Packaging export boundary", "Packaging/export boundary does not create packages or exports", "Packaging/export requires explicit operator approval", "Unsafe export destinations stay blocked", "Packaging groups", "Redaction license checklist") `
  -PlainEnglish @("Packaging/export boundary identity", "File bundle checklist", "Artifact checklist", "Destination checklist", "Denied export actions", "Unresolved export blockers", "Workflow profile registry route", "Release readiness route", "Next recommended action") `
  -RouteHref "/packaging-export-boundary"

Write-Host "[OK] CodexForge Phase 628 packaging export boundary smoke passed."
