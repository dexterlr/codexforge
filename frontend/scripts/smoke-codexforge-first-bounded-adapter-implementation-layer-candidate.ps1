param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 745 First Bounded Adapter Implementation Layer Candidate" `
  -ScriptFile "smoke-codexforge-first-bounded-adapter-implementation-layer-candidate.ps1" `
  -Domain "src\lib\codexforge\first-bounded-adapter-implementation-layer-candidate" `
  -Route "src\app\first-bounded-adapter-implementation-layer-candidate" `
  -MainPanel "FirstBoundedAdapterImplementationLayerCandidatePanel" `
  -CommandLabel "Go to First Bounded Adapter Implementation Layer Candidate" `
  -Modules @("first-bounded-adapter-implementation-layer-candidate-model.ts", "index.ts") `
  -Components @("FirstBoundedAdapterImplementationLayerCandidatePanel.tsx", "index.ts") `
  -Exports @("buildFirstBoundedAdapterImplementationLayerCandidateStableKey", "buildFirstBoundedAdapterImplementationLayerCandidate", "buildFirstBoundedAdapterImplementationLayerCandidateItems", "buildFirstBoundedAdapterImplementationLayerCandidateBoundary", "buildFirstBoundedAdapterImplementationLayerCandidateModel", "summarizeFirstBoundedAdapterImplementationLayerCandidate", "FIRST_BOUNDED_ADAPTER_IMPLEMENTATION_LAYER_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First Bounded Adapter Implementation Layer Candidate", "First bounded adapter implementation layer candidate does not execute adapters", "First bounded adapter implementation layer requires explicit operator approval", "Readiness for first implementation slices", "Deferred families", "Unresolved blockers", "Next recommended action", "What this unlocks next") `
  -PlainEnglish @("First Bounded Adapter Implementation Layer Candidate identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "first actual bounded implementation remains blocked") `
  -RouteHref "/first-bounded-adapter-implementation-layer-candidate"

Write-Host "[OK] CodexForge Phase 745 first bounded adapter implementation layer candidate smoke passed."
