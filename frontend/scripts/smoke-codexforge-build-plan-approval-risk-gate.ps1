param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1057 Build Plan Approval Risk Gate" `
  -ScriptFile "smoke-codexforge-build-plan-approval-risk-gate.ps1" `
  -Domain "src\lib\codexforge\build-plan-approval-risk-gate" `
  -Route "src\app\build-plan-approval-risk-gate" `
  -MainPanel "BuildPlanApprovalRiskGatePanel" `
  -CommandLabel "Go to Build Plan Approval Risk Gate" `
  -Modules @("build-plan-approval-risk-gate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanApprovalRiskGateStableKey", "buildBuildPlanApprovalRiskGate", "buildBuildPlanApprovalRiskGateItems", "buildBuildPlanApprovalRiskGateBoundary", "buildBuildPlanApprovalRiskGateModel", "summarizeBuildPlanApprovalRiskGate", "BUILD_PLAN_APPROVAL_RISK_GATE_LANGUAGE") `
  -PhaseMarkers @("Build plan approval risk gate", "Build plan approval risk gate does not approve risk", "Risk gate review requires explicit operator approval", "Risk gates check spend privacy remote calls tools files commands and runtimes", "Denied build plan approval risk paths remain blocked", "Build plan approval risk checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan approval risk gate does not approve risk", "Risk gate review requires explicit operator approval", "Denied build plan approval risk paths remain blocked") `
  -RouteHref "/build-plan-approval-risk-gate"

Write-Host "[OK] CodexForge Phase 1057 Build Plan Approval Risk Gate smoke passed."
