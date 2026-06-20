param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1018 Guided Build Workflow Boundary" `
  -ScriptFile "smoke-codexforge-guided-build-workflow-boundary.ps1" `
  -Domain "src\lib\codexforge\guided-build-workflow-boundary" `
  -Route "src\app\guided-build-workflow-boundary" `
  -MainPanel "GuidedBuildWorkflowBoundaryPanel" `
  -CommandLabel "Go to Guided Build Workflow Boundary" `
  -Modules @("guided-build-workflow-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildWorkflowBoundaryStableKey", "buildGuidedBuildWorkflowBoundary", "buildGuidedBuildWorkflowBoundaryItems", "buildGuidedBuildWorkflowBoundaryBoundary", "buildGuidedBuildWorkflowBoundaryModel", "summarizeGuidedBuildWorkflowBoundary", "GUIDED_BUILD_WORKFLOW_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Guided build workflow boundary", "Guided build workflow boundary does not execute builds", "Guided build workflow execution requires explicit operator approval", "Guided build supports game and non-game targets", "Denied guided build workflow paths remain blocked", "Guided build workflow checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build workflow boundary does not execute builds", "Guided build workflow execution requires explicit operator approval", "Denied guided build workflow paths remain blocked") `
  -RouteHref "/guided-build-workflow-boundary"

Write-Host "[OK] CodexForge Phase 1018 Guided Build Workflow Boundary smoke passed."
