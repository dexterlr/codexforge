param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 954 Project Builder MVP Integration Boundary" `
  -ScriptFile "smoke-codexforge-project-builder-mvp-integration-boundary.ps1" `
  -Domain "src\lib\codexforge\project-builder-mvp-integration-boundary" `
  -Route "src\app\project-builder-mvp-integration-boundary" `
  -MainPanel "ProjectBuilderMvpIntegrationBoundaryPanel" `
  -CommandLabel "Go to Project Builder MVP Integration Boundary" `
  -Modules @("project-builder-mvp-integration-boundary-model.ts", "index.ts") `
  -Components @("ProjectBuilderMvpIntegrationBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildProjectBuilderMvpIntegrationBoundaryStableKey", "buildProjectBuilderMvpIntegrationBoundary", "buildProjectBuilderMvpIntegrationBoundaryItems", "buildProjectBuilderMvpIntegrationBoundaryBoundary", "buildProjectBuilderMvpIntegrationBoundaryModel", "summarizeProjectBuilderMvpIntegrationBoundary", "PROJECT_BUILDER_MVP_INTEGRATION_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Project builder MVP integration boundary", "Project builder MVP integration boundary does not execute projects", "Project builder execution requires explicit operator approval", "Project builder combines model routing and backend adapter review", "Denied project builder integration paths remain blocked", "Project builder integration checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project builder MVP integration boundary does not execute projects", "Project builder execution requires explicit operator approval", "Denied project builder integration paths remain blocked") `
  -RouteHref "/project-builder-mvp-integration-boundary"

Write-Host "[OK] CodexForge Phase 954 Project builder MVP integration boundary smoke passed."
