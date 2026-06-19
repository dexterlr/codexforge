param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 825 First Backend Adapter Implementation Preview Candidate" `
  -ScriptFile "smoke-codexforge-first-backend-adapter-implementation-preview-candidate.ps1" `
  -Domain "src\lib\codexforge\first-backend-adapter-implementation-preview-candidate" `
  -Route "src\app\first-backend-adapter-implementation-preview-candidate" `
  -MainPanel "FirstBackendAdapterImplementationPreviewCandidatePanel" `
  -CommandLabel "Go to First Backend Adapter Implementation Preview Candidate" `
  -Modules @("first-backend-adapter-implementation-preview-candidate-model.ts", "index.ts") `
  -Components @("FirstBackendAdapterImplementationPreviewCandidatePanel.tsx", "index.ts") `
  -Exports @("buildFirstBackendAdapterImplementationPreviewCandidateStableKey", "buildFirstBackendAdapterImplementationPreviewCandidate", "buildFirstBackendAdapterImplementationPreviewCandidateItems", "buildFirstBackendAdapterImplementationPreviewCandidateBoundary", "buildFirstBackendAdapterImplementationPreviewCandidateModel", "summarizeFirstBackendAdapterImplementationPreviewCandidate", "FIRST_BACKEND_ADAPTER_IMPLEMENTATION_PREVIEW_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First backend adapter implementation preview candidate", "First backend adapter implementation preview candidate does not run live adapters", "Backend adapter implementation preview requires explicit operator approval", "Denied implementation candidate paths remain blocked", "Implementation candidate groups", "Implementation candidate checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First backend adapter implementation preview candidate does not run live adapters", "Backend adapter implementation preview requires explicit operator approval", "Denied implementation candidate paths remain blocked") `
  -RouteHref "/first-backend-adapter-implementation-preview-candidate"

Write-Host "[OK] CodexForge Phase 825 First backend adapter implementation preview candidate smoke passed."
