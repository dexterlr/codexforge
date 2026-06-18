param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 729 First Real Adapter MVP Candidate" `
  -ScriptFile "smoke-codexforge-first-real-adapter-mvp-candidate.ps1" `
  -Domain "src\lib\codexforge\first-real-adapter-mvp-candidate" `
  -Route "src\app\first-real-adapter-mvp-candidate" `
  -MainPanel "FirstRealAdapterMvpCandidatePanel" `
  -CommandLabel "Go to First Real Adapter MVP Candidate" `
  -Modules @("first-real-adapter-mvp-candidate-model.ts", "index.ts") `
  -Components @("FirstRealAdapterMvpCandidatePanel.tsx", "index.ts") `
  -Exports @("buildFirstRealAdapterMvpCandidateStableKey", "buildFirstRealAdapterMvpCandidate", "buildFirstRealAdapterMvpCandidates", "buildFirstRealAdapterMvpCandidateBoundary", "buildFirstRealAdapterMvpCandidateModel", "summarizeFirstRealAdapterMvpCandidate", "FIRST_REAL_ADAPTER_MVP_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First Real Adapter MVP Candidate", "First real adapter MVP candidate does not execute adapters", "First real adapter MVP execution requires explicit operator approval", "MVP readiness summary", "File write readiness", "Command runner readiness", "Local runtime readiness", "Evidence store readiness", "Result store readiness", "Recovery readiness", "Packaging readiness", "Project scaffold readiness", "Creative readiness", "Research readiness", "Chatbot readiness", "Game/server readiness", "Unresolved blockers", "Next recommended action") `
  -PlainEnglish @("First Real Adapter MVP Candidate identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-real-adapter-mvp-candidate"

Write-Host "[OK] CodexForge Phase 729 first real adapter mvp candidate smoke passed."
