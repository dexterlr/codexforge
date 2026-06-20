param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1059 Build Plan Approval Result Gate" `
  -ScriptFile "smoke-codexforge-build-plan-approval-result-gate.ps1" `
  -Domain "src\lib\codexforge\build-plan-approval-result-gate" `
  -Route "src\app\build-plan-approval-result-gate" `
  -MainPanel "BuildPlanApprovalResultGatePanel" `
  -CommandLabel "Go to Build Plan Approval Result Gate" `
  -Modules @("build-plan-approval-result-gate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanApprovalResultGateStableKey", "buildBuildPlanApprovalResultGate", "buildBuildPlanApprovalResultGateItems", "buildBuildPlanApprovalResultGateBoundary", "buildBuildPlanApprovalResultGateModel", "summarizeBuildPlanApprovalResultGate", "BUILD_PLAN_APPROVAL_RESULT_GATE_LANGUAGE") `
  -PhaseMarkers @("Build plan approval result gate", "Build plan approval result gate does not persist results", "Result gate review requires explicit operator approval", "Result gates route future outputs through shared result review", "Denied build plan approval result paths remain blocked", "Build plan approval result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan approval result gate does not persist results", "Result gate review requires explicit operator approval", "Denied build plan approval result paths remain blocked") `
  -RouteHref "/build-plan-approval-result-gate"

Write-Host "[OK] CodexForge Phase 1059 Build Plan Approval Result Gate smoke passed."
