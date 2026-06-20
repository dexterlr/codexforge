param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 936 First Model Router Beta Candidate" `
  -ScriptFile "smoke-codexforge-first-model-router-beta-candidate.ps1" `
  -Domain "src\lib\codexforge\first-model-router-beta-candidate" `
  -Route "src\app\first-model-router-beta-candidate" `
  -MainPanel "FirstModelRouterBetaCandidatePanel" `
  -CommandLabel "Go to First Model Router Beta Candidate" `
  -Modules @("first-model-router-beta-candidate-model.ts", "index.ts") `
  -Components @("FirstModelRouterBetaCandidatePanel.tsx", "index.ts") `
  -Exports @("buildFirstModelRouterBetaCandidateStableKey", "buildFirstModelRouterBetaCandidate", "buildFirstModelRouterBetaCandidateItems", "buildFirstModelRouterBetaCandidateBoundary", "buildFirstModelRouterBetaCandidateModel", "summarizeFirstModelRouterBetaCandidate", "FIRST_MODEL_ROUTER_BETA_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First model router beta candidate", "First model router beta candidate does not route live model calls", "Model router beta use requires explicit operator approval", "All model workers use one CodexForge brain memory and knowledge layer", "Denied model router beta paths remain blocked", "First model router beta checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First model router beta candidate does not route live model calls", "Model router beta use requires explicit operator approval", "Denied model router beta paths remain blocked") `
  -RouteHref "/first-model-router-beta-candidate"

Write-Host "[OK] CodexForge Phase 936 First model router beta candidate smoke passed."
