param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1056 Build Plan Approval Adapter Preview" `
  -ScriptFile "smoke-codexforge-build-plan-approval-adapter-preview.ps1" `
  -Domain "src\lib\codexforge\build-plan-approval-adapter-preview" `
  -Route "src\app\build-plan-approval-adapter-preview" `
  -MainPanel "BuildPlanApprovalAdapterPreviewPanel" `
  -CommandLabel "Go to Build Plan Approval Adapter Preview" `
  -Modules @("build-plan-approval-adapter-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanApprovalAdapterPreviewStableKey", "buildBuildPlanApprovalAdapterPreview", "buildBuildPlanApprovalAdapterPreviewItems", "buildBuildPlanApprovalAdapterPreviewBoundary", "buildBuildPlanApprovalAdapterPreviewModel", "summarizeBuildPlanApprovalAdapterPreview", "BUILD_PLAN_APPROVAL_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Build plan approval adapter preview", "Build plan approval adapter preview does not execute adapters", "Adapter approval requires explicit operator approval", "Adapter previews show backend and domain adapter gates", "Denied build plan approval adapter paths remain blocked", "Build plan approval adapter checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan approval adapter preview does not execute adapters", "Adapter approval requires explicit operator approval", "Denied build plan approval adapter paths remain blocked") `
  -RouteHref "/build-plan-approval-adapter-preview"

Write-Host "[OK] CodexForge Phase 1056 Build Plan Approval Adapter Preview smoke passed."
