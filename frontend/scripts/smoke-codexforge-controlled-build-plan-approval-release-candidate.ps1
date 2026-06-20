param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1065 Controlled Build Plan Approval Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-build-plan-approval-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-build-plan-approval-release-candidate" `
  -Route "src\app\controlled-build-plan-approval-release-candidate" `
  -MainPanel "ControlledBuildPlanApprovalReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Build Plan Approval Release Candidate" `
  -Modules @("controlled-build-plan-approval-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledBuildPlanApprovalReleaseCandidateStableKey", "buildControlledBuildPlanApprovalReleaseCandidate", "buildControlledBuildPlanApprovalReleaseCandidateItems", "buildControlledBuildPlanApprovalReleaseCandidateBoundary", "buildControlledBuildPlanApprovalReleaseCandidateModel", "summarizeControlledBuildPlanApprovalReleaseCandidate", "CONTROLLED_BUILD_PLAN_APPROVAL_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled build plan approval release candidate", "Controlled build plan approval release candidate does not call models or execute adapters", "Controlled build plan approval release requires explicit operator approval", "Release candidate supports build anything approval queues with shared brain gates", "Denied controlled build plan approval paths remain blocked", "Controlled build plan approval release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled build plan approval release candidate does not call models or execute adapters", "Controlled build plan approval release requires explicit operator approval", "Denied controlled build plan approval paths remain blocked") `
  -RouteHref "/controlled-build-plan-approval-release-candidate"

Write-Host "[OK] CodexForge Phase 1065 Controlled Build Plan Approval Release Candidate smoke passed."
