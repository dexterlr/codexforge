param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1054 Build Plan Approval Command Preview" `
  -ScriptFile "smoke-codexforge-build-plan-approval-command-preview.ps1" `
  -Domain "src\lib\codexforge\build-plan-approval-command-preview" `
  -Route "src\app\build-plan-approval-command-preview" `
  -MainPanel "BuildPlanApprovalCommandPreviewPanel" `
  -CommandLabel "Go to Build Plan Approval Command Preview" `
  -Modules @("build-plan-approval-command-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanApprovalCommandPreviewStableKey", "buildBuildPlanApprovalCommandPreview", "buildBuildPlanApprovalCommandPreviewItems", "buildBuildPlanApprovalCommandPreviewBoundary", "buildBuildPlanApprovalCommandPreviewModel", "summarizeBuildPlanApprovalCommandPreview", "BUILD_PLAN_APPROVAL_COMMAND_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Build plan approval command preview", "Build plan approval command preview does not run commands", "Command approval requires explicit operator approval", "Command previews show planned commands without execution", "Denied build plan approval command paths remain blocked", "Build plan approval command checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan approval command preview does not run commands", "Command approval requires explicit operator approval", "Denied build plan approval command paths remain blocked") `
  -RouteHref "/build-plan-approval-command-preview"

Write-Host "[OK] CodexForge Phase 1054 Build Plan Approval Command Preview smoke passed."
