param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1080 First Guarded Execution Queue Candidate" `
  -ScriptFile "smoke-codexforge-first-guarded-execution-queue-candidate.ps1" `
  -Domain "src\lib\codexforge\first-guarded-execution-queue-candidate" `
  -Route "src\app\first-guarded-execution-queue-candidate" `
  -MainPanel "FirstGuardedExecutionQueueCandidatePanel" `
  -CommandLabel "Go to First Guarded Execution Queue Candidate" `
  -Modules @("first-guarded-execution-queue-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstGuardedExecutionQueueCandidateStableKey", "buildFirstGuardedExecutionQueueCandidate", "buildFirstGuardedExecutionQueueCandidateItems", "buildFirstGuardedExecutionQueueCandidateBoundary", "buildFirstGuardedExecutionQueueCandidateModel", "summarizeFirstGuardedExecutionQueueCandidate", "FIRST_GUARDED_EXECUTION_QUEUE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First guarded execution queue candidate", "First guarded execution queue candidate does not execute builds", "Guarded execution queue candidates require explicit operator approval", "Candidate packets combine queue item handoffs preflight lock dry-run evidence result and recovery gates", "Denied guarded execution queue candidate paths remain blocked", "First guarded execution queue checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First guarded execution queue candidate does not execute builds", "Guarded execution queue candidates require explicit operator approval", "Denied guarded execution queue candidate paths remain blocked") `
  -RouteHref "/first-guarded-execution-queue-candidate"

Write-Host "[OK] CodexForge Phase 1080 First Guarded Execution Queue Candidate smoke passed."
