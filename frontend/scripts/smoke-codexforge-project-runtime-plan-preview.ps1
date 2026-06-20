param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 960 Project Runtime Plan Preview" `
  -ScriptFile "smoke-codexforge-project-runtime-plan-preview.ps1" `
  -Domain "src\lib\codexforge\project-runtime-plan-preview" `
  -Route "src\app\project-runtime-plan-preview" `
  -MainPanel "ProjectRuntimePlanPreviewPanel" `
  -CommandLabel "Go to Project Runtime Plan Preview" `
  -Modules @("project-runtime-plan-preview-model.ts", "index.ts") `
  -Components @("ProjectRuntimePlanPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectRuntimePlanPreviewStableKey", "buildProjectRuntimePlanPreview", "buildProjectRuntimePlanPreviewItems", "buildProjectRuntimePlanPreviewBoundary", "buildProjectRuntimePlanPreviewModel", "summarizeProjectRuntimePlanPreview", "PROJECT_RUNTIME_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Project runtime plan preview", "Project runtime plan preview does not start runtimes", "Runtime planning requires explicit operator approval", "Runtime plans include backend adapter review", "Denied project runtime plan paths remain blocked", "Project runtime plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project runtime plan preview does not start runtimes", "Runtime planning requires explicit operator approval", "Denied project runtime plan paths remain blocked") `
  -RouteHref "/project-runtime-plan-preview"

Write-Host "[OK] CodexForge Phase 960 Project runtime plan preview smoke passed."
