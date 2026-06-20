param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1064 First Approved Build Plan Candidate" `
  -ScriptFile "smoke-codexforge-first-approved-build-plan-candidate.ps1" `
  -Domain "src\lib\codexforge\first-approved-build-plan-candidate" `
  -Route "src\app\first-approved-build-plan-candidate" `
  -MainPanel "FirstApprovedBuildPlanCandidatePanel" `
  -CommandLabel "Go to First Approved Build Plan Candidate" `
  -Modules @("first-approved-build-plan-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstApprovedBuildPlanCandidateStableKey", "buildFirstApprovedBuildPlanCandidate", "buildFirstApprovedBuildPlanCandidateItems", "buildFirstApprovedBuildPlanCandidateBoundary", "buildFirstApprovedBuildPlanCandidateModel", "summarizeFirstApprovedBuildPlanCandidate", "FIRST_APPROVED_BUILD_PLAN_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First approved build plan candidate", "First approved build plan candidate does not execute builds", "Approved build plan candidates require explicit operator approval", "Candidate packets combine approval queue diff command runtime adapter risk evidence result and recovery gates", "Denied approved build plan candidate paths remain blocked", "First approved build plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First approved build plan candidate does not execute builds", "Approved build plan candidates require explicit operator approval", "Denied approved build plan candidate paths remain blocked") `
  -RouteHref "/first-approved-build-plan-candidate"

Write-Host "[OK] CodexForge Phase 1064 First Approved Build Plan Candidate smoke passed."
