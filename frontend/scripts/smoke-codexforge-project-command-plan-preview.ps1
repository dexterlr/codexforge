param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 959 Project Command Plan Preview" `
  -ScriptFile "smoke-codexforge-project-command-plan-preview.ps1" `
  -Domain "src\lib\codexforge\project-command-plan-preview" `
  -Route "src\app\project-command-plan-preview" `
  -MainPanel "ProjectCommandPlanPreviewPanel" `
  -CommandLabel "Go to Project Command Plan Preview" `
  -Modules @("project-command-plan-preview-model.ts", "index.ts") `
  -Components @("ProjectCommandPlanPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectCommandPlanPreviewStableKey", "buildProjectCommandPlanPreview", "buildProjectCommandPlanPreviewItems", "buildProjectCommandPlanPreviewBoundary", "buildProjectCommandPlanPreviewModel", "summarizeProjectCommandPlanPreview", "PROJECT_COMMAND_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Project command plan preview", "Project command plan preview does not run commands", "Command planning requires explicit operator approval", "Command plans include backend adapter review", "Denied project command plan paths remain blocked", "Project command plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project command plan preview does not run commands", "Command planning requires explicit operator approval", "Denied project command plan paths remain blocked") `
  -RouteHref "/project-command-plan-preview"

Write-Host "[OK] CodexForge Phase 959 Project command plan preview smoke passed."
