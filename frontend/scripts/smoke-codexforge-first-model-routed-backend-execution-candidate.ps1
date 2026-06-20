param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 952 First Model-Routed Backend Execution Candidate" `
  -ScriptFile "smoke-codexforge-first-model-routed-backend-execution-candidate.ps1" `
  -Domain "src\lib\codexforge\first-model-routed-backend-execution-candidate" `
  -Route "src\app\first-model-routed-backend-execution-candidate" `
  -MainPanel "FirstModelRoutedBackendExecutionCandidatePanel" `
  -CommandLabel "Go to First Model-Routed Backend Execution Candidate" `
  -Modules @("first-model-routed-backend-execution-candidate-model.ts", "index.ts") `
  -Components @("FirstModelRoutedBackendExecutionCandidatePanel.tsx", "index.ts") `
  -Exports @("buildFirstModelRoutedBackendExecutionCandidateStableKey", "buildFirstModelRoutedBackendExecutionCandidate", "buildFirstModelRoutedBackendExecutionCandidateItems", "buildFirstModelRoutedBackendExecutionCandidateBoundary", "buildFirstModelRoutedBackendExecutionCandidateModel", "summarizeFirstModelRoutedBackendExecutionCandidate", "FIRST_MODEL_ROUTED_BACKEND_EXECUTION_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First model-routed backend execution candidate", "First model-routed backend execution candidate does not execute adapters", "Backend execution candidates require explicit operator approval", "Candidate packets combine model routing and backend adapter review", "Denied backend execution candidate paths remain blocked", "First model-routed backend execution checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First model-routed backend execution candidate does not execute adapters", "Backend execution candidates require explicit operator approval", "Denied backend execution candidate paths remain blocked") `
  -RouteHref "/first-model-routed-backend-execution-candidate"

Write-Host "[OK] CodexForge Phase 952 First model-routed backend execution candidate smoke passed."
