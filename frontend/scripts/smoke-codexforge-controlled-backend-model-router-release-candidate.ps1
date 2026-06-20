param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 953 Controlled Backend Model Router Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-backend-model-router-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-backend-model-router-release-candidate" `
  -Route "src\app\controlled-backend-model-router-release-candidate" `
  -MainPanel "ControlledBackendModelRouterReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Backend Model Router Release Candidate" `
  -Modules @("controlled-backend-model-router-release-candidate-model.ts", "index.ts") `
  -Components @("ControlledBackendModelRouterReleaseCandidatePanel.tsx", "index.ts") `
  -Exports @("buildControlledBackendModelRouterReleaseCandidateStableKey", "buildControlledBackendModelRouterReleaseCandidate", "buildControlledBackendModelRouterReleaseCandidateItems", "buildControlledBackendModelRouterReleaseCandidateBoundary", "buildControlledBackendModelRouterReleaseCandidateModel", "summarizeControlledBackendModelRouterReleaseCandidate", "CONTROLLED_BACKEND_MODEL_ROUTER_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled backend model router release candidate", "Controlled backend model router release candidate does not call models or execute adapters", "Controlled backend model routing requires explicit operator approval", "Release candidate preserves shared context memory evidence and audit gates", "Denied controlled backend model router paths remain blocked", "Controlled backend model router release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled backend model router release candidate does not call models or execute adapters", "Controlled backend model routing requires explicit operator approval", "Denied controlled backend model router paths remain blocked") `
  -RouteHref "/controlled-backend-model-router-release-candidate"

Write-Host "[OK] CodexForge Phase 953 Controlled backend model router release candidate smoke passed."
