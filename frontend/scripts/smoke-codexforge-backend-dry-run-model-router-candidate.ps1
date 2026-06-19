param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 841 Backend Dry-Run Model Router Candidate" `
  -ScriptFile "smoke-codexforge-backend-dry-run-model-router-candidate.ps1" `
  -Domain "src\lib\codexforge\backend-dry-run-model-router-candidate" `
  -Route "src\app\backend-dry-run-model-router-candidate" `
  -MainPanel "BackendDryRunModelRouterCandidatePanel" `
  -CommandLabel "Go to Backend Dry-Run Model Router Candidate" `
  -Modules @("backend-dry-run-model-router-candidate-model.ts", "index.ts") `
  -Components @("BackendDryRunModelRouterCandidatePanel.tsx", "index.ts") `
  -Exports @("buildBackendDryRunModelRouterCandidateStableKey", "buildBackendDryRunModelRouterCandidate", "buildBackendDryRunModelRouterCandidateItems", "buildBackendDryRunModelRouterCandidateBoundary", "buildBackendDryRunModelRouterCandidateModel", "summarizeBackendDryRunModelRouterCandidate", "BACKEND_DRY_RUN_MODEL_ROUTER_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Backend dry-run model router candidate", "Backend dry-run model router candidate does not execute adapters or call models", "Backend dry-run and model routing require explicit operator approval", "Denied candidate execution paths remain blocked", "Backend model router candidate groups", "Candidate readiness checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Backend dry-run model router candidate does not execute adapters or call models", "Backend dry-run and model routing require explicit operator approval", "Denied candidate execution paths remain blocked") `
  -RouteHref "/backend-dry-run-model-router-candidate"

Write-Host "[OK] CodexForge Phase 841 Backend dry-run model router candidate smoke passed."
