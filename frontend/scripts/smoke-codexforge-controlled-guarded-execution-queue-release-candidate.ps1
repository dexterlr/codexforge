param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1081 Controlled Guarded Execution Queue Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-guarded-execution-queue-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-guarded-execution-queue-release-candidate" `
  -Route "src\app\controlled-guarded-execution-queue-release-candidate" `
  -MainPanel "ControlledGuardedExecutionQueueReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Guarded Execution Queue Release Candidate" `
  -Modules @("controlled-guarded-execution-queue-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledGuardedExecutionQueueReleaseCandidateStableKey", "buildControlledGuardedExecutionQueueReleaseCandidate", "buildControlledGuardedExecutionQueueReleaseCandidateItems", "buildControlledGuardedExecutionQueueReleaseCandidateBoundary", "buildControlledGuardedExecutionQueueReleaseCandidateModel", "summarizeControlledGuardedExecutionQueueReleaseCandidate", "CONTROLLED_GUARDED_EXECUTION_QUEUE_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled guarded execution queue release candidate", "Controlled guarded execution queue release candidate does not call models or execute adapters", "Controlled guarded execution queue release requires explicit operator approval", "Release candidate supports build anything execution queues with shared brain gates", "Denied controlled guarded execution queue paths remain blocked", "Controlled guarded execution queue release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled guarded execution queue release candidate does not call models or execute adapters", "Controlled guarded execution queue release requires explicit operator approval", "Denied controlled guarded execution queue paths remain blocked") `
  -RouteHref "/controlled-guarded-execution-queue-release-candidate"

Write-Host "[OK] CodexForge Phase 1081 Controlled Guarded Execution Queue Release Candidate smoke passed."
