param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 965 Project Approval Plan Preview" `
  -ScriptFile "smoke-codexforge-project-approval-plan-preview.ps1" `
  -Domain "src\lib\codexforge\project-approval-plan-preview" `
  -Route "src\app\project-approval-plan-preview" `
  -MainPanel "ProjectApprovalPlanPreviewPanel" `
  -CommandLabel "Go to Project Approval Plan Preview" `
  -Modules @("project-approval-plan-preview-model.ts", "index.ts") `
  -Components @("ProjectApprovalPlanPreviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectApprovalPlanPreviewStableKey", "buildProjectApprovalPlanPreview", "buildProjectApprovalPlanPreviewItems", "buildProjectApprovalPlanPreviewBoundary", "buildProjectApprovalPlanPreviewModel", "summarizeProjectApprovalPlanPreview", "PROJECT_APPROVAL_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Project approval plan preview", "Project approval plan preview does not approve actions", "Project approval requires explicit operator approval", "Approval plans list every gated model and backend action", "Denied project approval plan paths remain blocked", "Project approval plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project approval plan preview does not approve actions", "Project approval requires explicit operator approval", "Denied project approval plan paths remain blocked") `
  -RouteHref "/project-approval-plan-preview"

Write-Host "[OK] CodexForge Phase 965 Project approval plan preview smoke passed."
