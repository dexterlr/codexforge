param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 986 Universal Project Builder Boundary" `
  -ScriptFile "smoke-codexforge-universal-project-builder-boundary.ps1" `
  -Domain "src\lib\codexforge\universal-project-builder-boundary" `
  -Route "src\app\universal-project-builder-boundary" `
  -MainPanel "UniversalProjectBuilderBoundaryPanel" `
  -CommandLabel "Go to Universal Project Builder Boundary" `
  -Modules @("universal-project-builder-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildUniversalProjectBuilderBoundaryStableKey", "buildUniversalProjectBuilderBoundary", "buildUniversalProjectBuilderBoundaryItems", "buildUniversalProjectBuilderBoundaryBoundary", "buildUniversalProjectBuilderBoundaryModel", "summarizeUniversalProjectBuilderBoundary", "UNIVERSAL_PROJECT_BUILDER_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Universal project builder boundary", "Universal project builder boundary does not execute projects", "Universal project builder execution requires explicit operator approval", "Project targets include apps websites dashboards tools research automation creative trading data documentation and integrations", "Denied universal project builder paths remain blocked", "Universal project builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Universal project builder boundary does not execute projects", "Universal project builder execution requires explicit operator approval", "Denied universal project builder paths remain blocked") `
  -RouteHref "/universal-project-builder-boundary"

Write-Host "[OK] CodexForge Phase 986 Universal Project Builder Boundary smoke passed."
