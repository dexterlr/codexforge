param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 937 Controlled Model Router Beta Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-model-router-beta-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-model-router-beta-release-candidate" `
  -Route "src\app\controlled-model-router-beta-release-candidate" `
  -MainPanel "ControlledModelRouterBetaReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Model Router Beta Release Candidate" `
  -Modules @("controlled-model-router-beta-release-candidate-model.ts", "index.ts") `
  -Components @("ControlledModelRouterBetaReleaseCandidatePanel.tsx", "index.ts") `
  -Exports @("buildControlledModelRouterBetaReleaseCandidateStableKey", "buildControlledModelRouterBetaReleaseCandidate", "buildControlledModelRouterBetaReleaseCandidateItems", "buildControlledModelRouterBetaReleaseCandidateBoundary", "buildControlledModelRouterBetaReleaseCandidateModel", "summarizeControlledModelRouterBetaReleaseCandidate", "CONTROLLED_MODEL_ROUTER_BETA_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled model router beta release candidate", "Controlled model router beta release candidate does not call models", "Controlled model router beta release requires explicit operator approval", "Beta release preserves shared context memory evidence and audit gates", "Denied model router beta release paths remain blocked", "Controlled model router beta release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled model router beta release candidate does not call models", "Controlled model router beta release requires explicit operator approval", "Denied model router beta release paths remain blocked") `
  -RouteHref "/controlled-model-router-beta-release-candidate"

Write-Host "[OK] CodexForge Phase 937 Controlled model router beta release candidate smoke passed."
