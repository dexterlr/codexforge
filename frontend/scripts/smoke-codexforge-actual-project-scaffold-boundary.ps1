param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 769 Actual Project Scaffold Boundary" `
  -ScriptFile "smoke-codexforge-actual-project-scaffold-boundary.ps1" `
  -Domain "src\lib\codexforge\actual-project-scaffold-boundary" `
  -Route "src\app\actual-project-scaffold-boundary" `
  -MainPanel "ActualProjectScaffoldBoundaryPanel" `
  -CommandLabel "Go to Actual Project Scaffold Boundary" `
  -Modules @("actual-project-scaffold-boundary-model.ts", "index.ts") `
  -Components @("ActualProjectScaffoldBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildActualProjectScaffoldBoundaryStableKey", "buildActualProjectScaffoldBoundary", "buildActualProjectScaffoldBoundaryItems", "buildActualProjectScaffoldBoundaryBoundary", "buildActualProjectScaffoldBoundaryModel", "summarizeActualProjectScaffoldBoundary", "ACTUAL_PROJECT_SCAFFOLD_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Actual Project Scaffold Boundary", "Actual project scaffold boundary does not create projects from UI", "Project scaffold execution requires explicit operator approval", "Boundary packet fields", "project type", "template", "target path", "file write dependency", "command/runtime dependency", "approval state", "audit/evidence/result/recovery links", "blocked actions", "Original medieval fantasy", "No copied franchise assets") `
  -PlainEnglish @("Actual Project Scaffold Boundary identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not create projects from UI") `
  -RouteHref "/actual-project-scaffold-boundary"

Write-Host "[OK] CodexForge Phase 769 actual project scaffold boundary smoke passed."
