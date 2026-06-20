param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1055 Build Plan Approval Runtime Preview" `
  -ScriptFile "smoke-codexforge-build-plan-approval-runtime-preview.ps1" `
  -Domain "src\lib\codexforge\build-plan-approval-runtime-preview" `
  -Route "src\app\build-plan-approval-runtime-preview" `
  -MainPanel "BuildPlanApprovalRuntimePreviewPanel" `
  -CommandLabel "Go to Build Plan Approval Runtime Preview" `
  -Modules @("build-plan-approval-runtime-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanApprovalRuntimePreviewStableKey", "buildBuildPlanApprovalRuntimePreview", "buildBuildPlanApprovalRuntimePreviewItems", "buildBuildPlanApprovalRuntimePreviewBoundary", "buildBuildPlanApprovalRuntimePreviewModel", "summarizeBuildPlanApprovalRuntimePreview", "BUILD_PLAN_APPROVAL_RUNTIME_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Build plan approval runtime preview", "Build plan approval runtime preview does not start runtimes", "Runtime approval requires explicit operator approval", "Runtime previews show planned runtime launches without execution", "Denied build plan approval runtime paths remain blocked", "Build plan approval runtime checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan approval runtime preview does not start runtimes", "Runtime approval requires explicit operator approval", "Denied build plan approval runtime paths remain blocked") `
  -RouteHref "/build-plan-approval-runtime-preview"

Write-Host "[OK] CodexForge Phase 1055 Build Plan Approval Runtime Preview smoke passed."
