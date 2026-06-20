param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 962 Project Result Plan Preview" `
  -ScriptFile "smoke-codexforge-project-result-plan-preview.ps1" `
  -Domain "src\lib\codexforge\project-result-plan-preview" `
  -Route "src\app\project-result-plan-preview" `
  -MainPanel "ProjectResultPlanPreviewPanel" `
  -CommandLabel "Go to Project Result Plan Preview" `
  -Modules @("project-result-plan-preview-model.ts", "index.ts") `
  -Components @("ProjectResultPlanPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectResultPlanPreviewStableKey", "buildProjectResultPlanPreview", "buildProjectResultPlanPreviewItems", "buildProjectResultPlanPreviewBoundary", "buildProjectResultPlanPreviewModel", "summarizeProjectResultPlanPreview", "PROJECT_RESULT_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Project result plan preview", "Project result plan preview does not persist results", "Result planning requires explicit operator approval", "Result plans route outputs to shared review", "Denied project result plan paths remain blocked", "Project result plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project result plan preview does not persist results", "Result planning requires explicit operator approval", "Denied project result plan paths remain blocked") `
  -RouteHref "/project-result-plan-preview"

Write-Host "[OK] CodexForge Phase 962 Project result plan preview smoke passed."
