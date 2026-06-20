param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1050 Build Plan Approval Boundary" `
  -ScriptFile "smoke-codexforge-build-plan-approval-boundary.ps1" `
  -Domain "src\lib\codexforge\build-plan-approval-boundary" `
  -Route "src\app\build-plan-approval-boundary" `
  -MainPanel "BuildPlanApprovalBoundaryPanel" `
  -CommandLabel "Go to Build Plan Approval Boundary" `
  -Modules @("build-plan-approval-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanApprovalBoundaryStableKey", "buildBuildPlanApprovalBoundary", "buildBuildPlanApprovalBoundaryItems", "buildBuildPlanApprovalBoundaryBoundary", "buildBuildPlanApprovalBoundaryModel", "summarizeBuildPlanApprovalBoundary", "BUILD_PLAN_APPROVAL_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Build plan approval boundary", "Build plan approval boundary does not approve actions", "Build plan approval requires explicit operator approval", "Build plan approvals gate model backend and domain actions", "Denied build plan approval boundary paths remain blocked", "Build plan approval boundary checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan approval boundary does not approve actions", "Build plan approval requires explicit operator approval", "Denied build plan approval boundary paths remain blocked") `
  -RouteHref "/build-plan-approval-boundary"

Write-Host "[OK] CodexForge Phase 1050 Build Plan Approval Boundary smoke passed."
