param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1048 First Complete Build Plan Candidate" `
  -ScriptFile "smoke-codexforge-first-complete-build-plan-candidate.ps1" `
  -Domain "src\lib\codexforge\first-complete-build-plan-candidate" `
  -Route "src\app\first-complete-build-plan-candidate" `
  -MainPanel "FirstCompleteBuildPlanCandidatePanel" `
  -CommandLabel "Go to First Complete Build Plan Candidate" `
  -Modules @("first-complete-build-plan-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstCompleteBuildPlanCandidateStableKey", "buildFirstCompleteBuildPlanCandidate", "buildFirstCompleteBuildPlanCandidateItems", "buildFirstCompleteBuildPlanCandidateBoundary", "buildFirstCompleteBuildPlanCandidateModel", "summarizeFirstCompleteBuildPlanCandidate", "FIRST_COMPLETE_BUILD_PLAN_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First complete build plan candidate", "First complete build plan candidate does not execute builds", "Complete build plan candidates require explicit operator approval", "Candidate packets combine summary requirements architecture files commands runtimes adapters validation risk approvals evidence results and recovery", "Denied complete build plan candidate paths remain blocked", "First complete build plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First complete build plan candidate does not execute builds", "Complete build plan candidates require explicit operator approval", "Denied complete build plan candidate paths remain blocked") `
  -RouteHref "/first-complete-build-plan-candidate"

Write-Host "[OK] CodexForge Phase 1048 First Complete Build Plan Candidate smoke passed."
