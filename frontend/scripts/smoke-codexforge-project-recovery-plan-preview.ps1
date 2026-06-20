param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 963 Project Recovery Plan Preview" `
  -ScriptFile "smoke-codexforge-project-recovery-plan-preview.ps1" `
  -Domain "src\lib\codexforge\project-recovery-plan-preview" `
  -Route "src\app\project-recovery-plan-preview" `
  -MainPanel "ProjectRecoveryPlanPreviewPanel" `
  -CommandLabel "Go to Project Recovery Plan Preview" `
  -Modules @("project-recovery-plan-preview-model.ts", "index.ts") `
  -Components @("ProjectRecoveryPlanPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectRecoveryPlanPreviewStableKey", "buildProjectRecoveryPlanPreview", "buildProjectRecoveryPlanPreviewItems", "buildProjectRecoveryPlanPreviewBoundary", "buildProjectRecoveryPlanPreviewModel", "summarizeProjectRecoveryPlanPreview", "PROJECT_RECOVERY_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Project recovery plan preview", "Project recovery plan preview does not trigger recovery", "Recovery planning requires explicit operator approval", "Recovery plans include failure and rollback strategy", "Denied project recovery plan paths remain blocked", "Project recovery plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project recovery plan preview does not trigger recovery", "Recovery planning requires explicit operator approval", "Denied project recovery plan paths remain blocked") `
  -RouteHref "/project-recovery-plan-preview"

Write-Host "[OK] CodexForge Phase 963 Project recovery plan preview smoke passed."
