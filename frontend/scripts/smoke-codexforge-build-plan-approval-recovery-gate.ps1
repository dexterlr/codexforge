param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1060 Build Plan Approval Recovery Gate" `
  -ScriptFile "smoke-codexforge-build-plan-approval-recovery-gate.ps1" `
  -Domain "src\lib\codexforge\build-plan-approval-recovery-gate" `
  -Route "src\app\build-plan-approval-recovery-gate" `
  -MainPanel "BuildPlanApprovalRecoveryGatePanel" `
  -CommandLabel "Go to Build Plan Approval Recovery Gate" `
  -Modules @("build-plan-approval-recovery-gate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanApprovalRecoveryGateStableKey", "buildBuildPlanApprovalRecoveryGate", "buildBuildPlanApprovalRecoveryGateItems", "buildBuildPlanApprovalRecoveryGateBoundary", "buildBuildPlanApprovalRecoveryGateModel", "summarizeBuildPlanApprovalRecoveryGate", "BUILD_PLAN_APPROVAL_RECOVERY_GATE_LANGUAGE") `
  -PhaseMarkers @("Build plan approval recovery gate", "Build plan approval recovery gate does not trigger recovery", "Recovery gate review requires explicit operator approval", "Recovery gates include rollback backup restore and retry plans", "Denied build plan approval recovery paths remain blocked", "Build plan approval recovery checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan approval recovery gate does not trigger recovery", "Recovery gate review requires explicit operator approval", "Denied build plan approval recovery paths remain blocked") `
  -RouteHref "/build-plan-approval-recovery-gate"

Write-Host "[OK] CodexForge Phase 1060 Build Plan Approval Recovery Gate smoke passed."
