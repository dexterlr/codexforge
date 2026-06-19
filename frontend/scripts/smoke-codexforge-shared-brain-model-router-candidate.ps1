param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 857 Shared Brain Model Router Candidate" `
  -ScriptFile "smoke-codexforge-shared-brain-model-router-candidate.ps1" `
  -Domain "src\lib\codexforge\shared-brain-model-router-candidate" `
  -Route "src\app\shared-brain-model-router-candidate" `
  -MainPanel "SharedBrainModelRouterCandidatePanel" `
  -CommandLabel "Go to Shared Brain Model Router Candidate" `
  -Modules @("shared-brain-model-router-candidate-model.ts", "index.ts") `
  -Components @("SharedBrainModelRouterCandidatePanel.tsx", "index.ts") `
  -Exports @("buildSharedBrainModelRouterCandidateStableKey", "buildSharedBrainModelRouterCandidate", "buildSharedBrainModelRouterCandidateItems", "buildSharedBrainModelRouterCandidateBoundary", "buildSharedBrainModelRouterCandidateModel", "summarizeSharedBrainModelRouterCandidate", "SHARED_BRAIN_MODEL_ROUTER_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Shared brain model router candidate", "Shared brain model router candidate does not route live model calls", "Shared brain model routing requires explicit operator approval", "All models use one CodexForge brain memory and knowledge layer", "Denied shared brain routing paths remain blocked", "Shared brain router candidate checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Shared brain model router candidate does not route live model calls", "Shared brain model routing requires explicit operator approval", "Denied shared brain routing paths remain blocked") `
  -RouteHref "/shared-brain-model-router-candidate"

Write-Host "[OK] CodexForge Phase 857 Shared brain model router candidate smoke passed."
