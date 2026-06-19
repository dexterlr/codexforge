param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 873 Controlled Model Use Candidate" `
  -ScriptFile "smoke-codexforge-controlled-model-use-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-model-use-candidate" `
  -Route "src\app\controlled-model-use-candidate" `
  -MainPanel "ControlledModelUseCandidatePanel" `
  -CommandLabel "Go to Controlled Model Use Candidate" `
  -Modules @("controlled-model-use-candidate-model.ts", "index.ts") `
  -Components @("ControlledModelUseCandidatePanel.tsx", "index.ts") `
  -Exports @("buildControlledModelUseCandidateStableKey", "buildControlledModelUseCandidate", "buildControlledModelUseCandidateItems", "buildControlledModelUseCandidateBoundary", "buildControlledModelUseCandidateModel", "summarizeControlledModelUseCandidate", "CONTROLLED_MODEL_USE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled model use candidate", "Controlled model use candidate does not call models", "Controlled model use requires explicit operator approval", "All model use shares one CodexForge brain memory and knowledge layer", "Denied controlled model use paths remain blocked", "Controlled model use candidate checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled model use candidate does not call models", "Controlled model use requires explicit operator approval", "Denied controlled model use paths remain blocked") `
  -RouteHref "/controlled-model-use-candidate"

Write-Host "[OK] CodexForge Phase 873 Controlled model use candidate smoke passed."
