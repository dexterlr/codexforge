param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 961 Project Evidence Plan Preview" `
  -ScriptFile "smoke-codexforge-project-evidence-plan-preview.ps1" `
  -Domain "src\lib\codexforge\project-evidence-plan-preview" `
  -Route "src\app\project-evidence-plan-preview" `
  -MainPanel "ProjectEvidencePlanPreviewPanel" `
  -CommandLabel "Go to Project Evidence Plan Preview" `
  -Modules @("project-evidence-plan-preview-model.ts", "index.ts") `
  -Components @("ProjectEvidencePlanPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectEvidencePlanPreviewStableKey", "buildProjectEvidencePlanPreview", "buildProjectEvidencePlanPreviewItems", "buildProjectEvidencePlanPreviewBoundary", "buildProjectEvidencePlanPreviewModel", "summarizeProjectEvidencePlanPreview", "PROJECT_EVIDENCE_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Project evidence plan preview", "Project evidence plan preview does not persist evidence", "Evidence planning requires explicit operator approval", "Evidence plans route outputs to shared review", "Denied project evidence plan paths remain blocked", "Project evidence plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project evidence plan preview does not persist evidence", "Evidence planning requires explicit operator approval", "Denied project evidence plan paths remain blocked") `
  -RouteHref "/project-evidence-plan-preview"

Write-Host "[OK] CodexForge Phase 961 Project evidence plan preview smoke passed."
