param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1058 Build Plan Approval Evidence Gate" `
  -ScriptFile "smoke-codexforge-build-plan-approval-evidence-gate.ps1" `
  -Domain "src\lib\codexforge\build-plan-approval-evidence-gate" `
  -Route "src\app\build-plan-approval-evidence-gate" `
  -MainPanel "BuildPlanApprovalEvidenceGatePanel" `
  -CommandLabel "Go to Build Plan Approval Evidence Gate" `
  -Modules @("build-plan-approval-evidence-gate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanApprovalEvidenceGateStableKey", "buildBuildPlanApprovalEvidenceGate", "buildBuildPlanApprovalEvidenceGateItems", "buildBuildPlanApprovalEvidenceGateBoundary", "buildBuildPlanApprovalEvidenceGateModel", "summarizeBuildPlanApprovalEvidenceGate", "BUILD_PLAN_APPROVAL_EVIDENCE_GATE_LANGUAGE") `
  -PhaseMarkers @("Build plan approval evidence gate", "Build plan approval evidence gate does not persist evidence", "Evidence gate review requires explicit operator approval", "Evidence gates route future outputs through shared evidence review", "Denied build plan approval evidence paths remain blocked", "Build plan approval evidence checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan approval evidence gate does not persist evidence", "Evidence gate review requires explicit operator approval", "Denied build plan approval evidence paths remain blocked") `
  -RouteHref "/build-plan-approval-evidence-gate"

Write-Host "[OK] CodexForge Phase 1058 Build Plan Approval Evidence Gate smoke passed."
