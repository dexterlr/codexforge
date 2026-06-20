param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 958 Project File Plan Preview" `
  -ScriptFile "smoke-codexforge-project-file-plan-preview.ps1" `
  -Domain "src\lib\codexforge\project-file-plan-preview" `
  -Route "src\app\project-file-plan-preview" `
  -MainPanel "ProjectFilePlanPreviewPanel" `
  -CommandLabel "Go to Project File Plan Preview" `
  -Modules @("project-file-plan-preview-model.ts", "index.ts") `
  -Components @("ProjectFilePlanPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectFilePlanPreviewStableKey", "buildProjectFilePlanPreview", "buildProjectFilePlanPreviewItems", "buildProjectFilePlanPreviewBoundary", "buildProjectFilePlanPreviewModel", "summarizeProjectFilePlanPreview", "PROJECT_FILE_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Project file plan preview", "Project file plan preview does not write files", "File planning requires explicit operator approval", "File plans include backend adapter review", "Denied project file plan paths remain blocked", "Project file plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project file plan preview does not write files", "File planning requires explicit operator approval", "Denied project file plan paths remain blocked") `
  -RouteHref "/project-file-plan-preview"

Write-Host "[OK] CodexForge Phase 958 Project file plan preview smoke passed."
