param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 824 Backend Adapter Dry-Run Candidate" `
  -ScriptFile "smoke-codexforge-backend-adapter-dry-run-candidate.ps1" `
  -Domain "src\lib\codexforge\backend-adapter-dry-run-candidate" `
  -Route "src\app\backend-adapter-dry-run-candidate" `
  -MainPanel "BackendAdapterDryRunCandidatePanel" `
  -CommandLabel "Go to Backend Adapter Dry-Run Candidate" `
  -Modules @("backend-adapter-dry-run-candidate-model.ts", "index.ts") `
  -Components @("BackendAdapterDryRunCandidatePanel.tsx", "index.ts") `
  -Exports @("buildBackendAdapterDryRunCandidateStableKey", "buildBackendAdapterDryRunCandidate", "buildBackendAdapterDryRunCandidateItems", "buildBackendAdapterDryRunCandidateBoundary", "buildBackendAdapterDryRunCandidateModel", "summarizeBackendAdapterDryRunCandidate", "BACKEND_ADAPTER_DRY_RUN_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Backend adapter dry-run candidate", "Backend adapter dry-run candidate does not execute dry-runs automatically", "Dry-run execution requires explicit operator approval", "Denied dry-run paths remain blocked", "Dry-run candidate groups", "Dry-run candidate checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Backend adapter dry-run candidate does not execute dry-runs automatically", "Dry-run execution requires explicit operator approval", "Denied dry-run paths remain blocked") `
  -RouteHref "/backend-adapter-dry-run-candidate"

Write-Host "[OK] CodexForge Phase 824 Backend adapter dry-run candidate smoke passed."
