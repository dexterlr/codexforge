param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 964 Project Packaging Plan Preview" `
  -ScriptFile "smoke-codexforge-project-packaging-plan-preview.ps1" `
  -Domain "src\lib\codexforge\project-packaging-plan-preview" `
  -Route "src\app\project-packaging-plan-preview" `
  -MainPanel "ProjectPackagingPlanPreviewPanel" `
  -CommandLabel "Go to Project Packaging Plan Preview" `
  -Modules @("project-packaging-plan-preview-model.ts", "index.ts") `
  -Components @("ProjectPackagingPlanPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectPackagingPlanPreviewStableKey", "buildProjectPackagingPlanPreview", "buildProjectPackagingPlanPreviewItems", "buildProjectPackagingPlanPreviewBoundary", "buildProjectPackagingPlanPreviewModel", "summarizeProjectPackagingPlanPreview", "PROJECT_PACKAGING_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Project packaging plan preview", "Project packaging plan preview does not package outputs", "Packaging planning requires explicit operator approval", "Packaging plans include export and artifact review", "Denied project packaging plan paths remain blocked", "Project packaging plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project packaging plan preview does not package outputs", "Packaging planning requires explicit operator approval", "Denied project packaging plan paths remain blocked") `
  -RouteHref "/project-packaging-plan-preview"

Write-Host "[OK] CodexForge Phase 964 Project packaging plan preview smoke passed."
