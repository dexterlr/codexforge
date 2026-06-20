param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 921 Model Router Execution Readiness Candidate" `
  -ScriptFile "smoke-codexforge-model-router-execution-readiness-candidate.ps1" `
  -Domain "src\lib\codexforge\model-router-execution-readiness-candidate" `
  -Route "src\app\model-router-execution-readiness-candidate" `
  -MainPanel "ModelRouterExecutionReadinessCandidatePanel" `
  -CommandLabel "Go to Model Router Execution Readiness Candidate" `
  -Modules @("model-router-execution-readiness-candidate-model.ts", "index.ts") `
  -Components @("ModelRouterExecutionReadinessCandidatePanel.tsx", "index.ts") `
  -Exports @("buildModelRouterExecutionReadinessCandidateStableKey", "buildModelRouterExecutionReadinessCandidate", "buildModelRouterExecutionReadinessCandidateItems", "buildModelRouterExecutionReadinessCandidateBoundary", "buildModelRouterExecutionReadinessCandidateModel", "summarizeModelRouterExecutionReadinessCandidate", "MODEL_ROUTER_EXECUTION_READINESS_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Model router execution readiness candidate", "Model router execution readiness candidate does not route live model calls", "Model router execution requires explicit operator approval", "All model workers use one CodexForge brain memory and knowledge layer", "Denied model router execution paths remain blocked", "Model router execution readiness checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model router execution readiness candidate does not route live model calls", "Model router execution requires explicit operator approval", "Denied model router execution paths remain blocked") `
  -RouteHref "/model-router-execution-readiness-candidate"

Write-Host "[OK] CodexForge Phase 921 model router execution readiness candidate smoke passed."
