param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 889 Controlled Model Router Readiness Candidate" `
  -ScriptFile "smoke-codexforge-controlled-model-router-readiness-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-model-router-readiness-candidate" `
  -Route "src\app\controlled-model-router-readiness-candidate" `
  -MainPanel "ControlledModelRouterReadinessCandidatePanel" `
  -CommandLabel "Go to Controlled Model Router Readiness Candidate" `
  -Modules @("controlled-model-router-readiness-candidate-model.ts", "index.ts") `
  -Components @("ControlledModelRouterReadinessCandidatePanel.tsx", "index.ts") `
  -Exports @("buildControlledModelRouterReadinessCandidateStableKey", "buildControlledModelRouterReadinessCandidate", "buildControlledModelRouterReadinessCandidateItems", "buildControlledModelRouterReadinessCandidateBoundary", "buildControlledModelRouterReadinessCandidateModel", "summarizeControlledModelRouterReadinessCandidate", "CONTROLLED_MODEL_ROUTER_READINESS_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled model router readiness candidate", "Controlled model router readiness candidate does not route live model calls", "Controlled model routing requires explicit operator approval", "All model workers use one CodexForge brain memory and knowledge layer", "Denied model router readiness paths remain blocked", "Controlled model router readiness checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled model router readiness candidate does not route live model calls", "Controlled model routing requires explicit operator approval", "Denied model router readiness paths remain blocked") `
  -RouteHref "/controlled-model-router-readiness-candidate"

Write-Host "[OK] CodexForge Phase 889 Controlled model router readiness candidate smoke passed."
