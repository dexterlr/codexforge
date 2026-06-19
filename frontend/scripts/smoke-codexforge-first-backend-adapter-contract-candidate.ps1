param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 809 First Backend Adapter Contract Candidate" `
  -ScriptFile "smoke-codexforge-first-backend-adapter-contract-candidate.ps1" `
  -Domain "src\lib\codexforge\first-backend-adapter-contract-candidate" `
  -Route "src\app\first-backend-adapter-contract-candidate" `
  -MainPanel "FirstBackendAdapterContractCandidatePanel" `
  -CommandLabel "Go to First Backend Adapter Contract Candidate" `
  -Modules @("first-backend-adapter-contract-candidate-model.ts", "index.ts") `
  -Components @("FirstBackendAdapterContractCandidatePanel.tsx", "index.ts") `
  -Exports @("buildFirstBackendAdapterContractCandidateStableKey", "buildFirstBackendAdapterContractCandidate", "buildFirstBackendAdapterContractCandidateItems", "buildFirstBackendAdapterContractCandidateBoundary", "buildFirstBackendAdapterContractCandidateModel", "summarizeFirstBackendAdapterContractCandidate", "FIRST_BACKEND_ADAPTER_CONTRACT_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First Backend Adapter Contract Candidate", "First backend adapter contract candidate does not execute adapters", "Backend adapter contract execution requires explicit operator approval", "backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "backend boundary", "local bridge", "file write", "command runner", "runtime", "evidence", "result", "recovery", "packaging", "project scaffold", "approval", "audit", "sandbox", "validation", "operator trial", "deferred families", "provider/model", "connector", "automation", "creative", "research", "chatbot", "game/server", "unresolved blockers", "next recommended action") `
  -PlainEnglish @("backend contract only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "what this unlocks next", "First backend adapter contract candidate does not execute adapters") `
  -RouteHref "/first-backend-adapter-contract-candidate"

Write-Host "[OK] CodexForge Phase 809 first backend adapter contract candidate smoke passed."
