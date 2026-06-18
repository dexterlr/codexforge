param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 713 First Bounded Adapter Implementation Candidate" `
  -ScriptFile "smoke-codexforge-first-bounded-adapter-implementation-candidate.ps1" `
  -Domain "src\lib\codexforge\first-bounded-adapter-implementation-candidate" `
  -Route "src\app\first-bounded-adapter-implementation-candidate" `
  -MainPanel "FirstBoundedAdapterImplementationCandidatePanel" `
  -CommandLabel "Go to First Bounded Adapter Implementation Candidate" `
  -Modules @("first-bounded-adapter-implementation-candidate-model.ts", "index.ts") `
  -Components @("FirstBoundedAdapterImplementationCandidatePanel.tsx", "index.ts") `
  -Exports @("buildFirstBoundedAdapterImplementationCandidateStableKey", "buildFirstBoundedAdapterImplementationCandidate", "buildFirstBoundedAdapterImplementationCandidates", "buildFirstBoundedAdapterImplementationCandidateBoundary", "buildFirstBoundedAdapterImplementationCandidateModel", "summarizeFirstBoundedAdapterImplementationCandidate", "FIRST_BOUNDED_ADAPTER_IMPLEMENTATION_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First Bounded Adapter Implementation Candidate", "First bounded adapter implementation candidate does not execute adapters", "First bounded adapter implementation requires explicit operator approval", "Readiness across implementation-plan families", "Unresolved blockers", "Next recommended action", "File-write command runtime first slice") `
  -PlainEnglish @("First bounded adapter implementation candidate identity", "implementation plan only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action") `
  -RouteHref "/first-bounded-adapter-implementation-candidate"

Write-Host "[OK] CodexForge Phase 713 first bounded adapter implementation candidate smoke passed."
