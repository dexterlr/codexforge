param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1053 Build Plan Approval Diff Preview" `
  -ScriptFile "smoke-codexforge-build-plan-approval-diff-preview.ps1" `
  -Domain "src\lib\codexforge\build-plan-approval-diff-preview" `
  -Route "src\app\build-plan-approval-diff-preview" `
  -MainPanel "BuildPlanApprovalDiffPreviewPanel" `
  -CommandLabel "Go to Build Plan Approval Diff Preview" `
  -Modules @("build-plan-approval-diff-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanApprovalDiffPreviewStableKey", "buildBuildPlanApprovalDiffPreview", "buildBuildPlanApprovalDiffPreviewItems", "buildBuildPlanApprovalDiffPreviewBoundary", "buildBuildPlanApprovalDiffPreviewModel", "summarizeBuildPlanApprovalDiffPreview", "BUILD_PLAN_APPROVAL_DIFF_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Build plan approval diff preview", "Build plan approval diff preview does not write files", "Diff approval requires explicit operator approval", "Diff previews show planned mutations without applying them", "Denied build plan approval diff paths remain blocked", "Build plan approval diff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan approval diff preview does not write files", "Diff approval requires explicit operator approval", "Denied build plan approval diff paths remain blocked") `
  -RouteHref "/build-plan-approval-diff-preview"

Write-Host "[OK] CodexForge Phase 1053 Build Plan Approval Diff Preview smoke passed."
