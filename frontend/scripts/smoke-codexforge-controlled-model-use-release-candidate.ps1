param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 905 Controlled Model Use Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-model-use-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-model-use-release-candidate" `
  -Route "src\app\controlled-model-use-release-candidate" `
  -MainPanel "ControlledModelUseReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Model Use Release Candidate" `
  -Modules @("controlled-model-use-release-candidate-model.ts", "index.ts") `
  -Components @("ControlledModelUseReleaseCandidatePanel.tsx", "index.ts") `
  -Exports @("buildControlledModelUseReleaseCandidateStableKey", "buildControlledModelUseReleaseCandidate", "buildControlledModelUseReleaseCandidateItems", "buildControlledModelUseReleaseCandidateBoundary", "buildControlledModelUseReleaseCandidateModel", "summarizeControlledModelUseReleaseCandidate", "CONTROLLED_MODEL_USE_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled model use release candidate", "Controlled model use release candidate does not call models", "Controlled model use requires explicit operator approval", "All model workers use one CodexForge brain memory and knowledge layer", "Denied controlled model-use release paths remain blocked", "Controlled model-use release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled model use release candidate does not call models", "Controlled model use requires explicit operator approval", "Denied controlled model-use release paths remain blocked") `
  -RouteHref "/controlled-model-use-release-candidate"

Write-Host "[OK] CodexForge Phase 905 Controlled model use release candidate smoke passed."

