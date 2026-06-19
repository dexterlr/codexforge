param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 791 First Real Adapter Wiring Candidate" `
  -ScriptFile "smoke-codexforge-first-real-adapter-wiring-candidate.ps1" `
  -Domain "src\lib\codexforge\first-real-adapter-wiring-candidate" `
  -Route "src\app\first-real-adapter-wiring-candidate" `
  -MainPanel "FirstRealAdapterWiringCandidatePanel" `
  -CommandLabel "Go to First Real Adapter Wiring Candidate" `
  -Modules @("first-real-adapter-wiring-candidate-model.ts", "index.ts") `
  -Components @("FirstRealAdapterWiringCandidatePanel.tsx", "index.ts") `
  -Exports @("buildFirstRealAdapterWiringCandidateStableKey", "buildFirstRealAdapterWiringCandidate", "buildFirstRealAdapterWiringCandidateItems", "buildFirstRealAdapterWiringCandidateBoundary", "buildFirstRealAdapterWiringCandidateModel", "summarizeFirstRealAdapterWiringCandidate", "FIRST_REAL_ADAPTER_WIRING_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First Real Adapter Wiring Candidate", "First real adapter wiring candidate does not execute adapters", "Real adapter wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "file write", "command runner", "local runtime", "evidence store", "result store", "recovery", "packaging", "project scaffold", "approval", "audit", "sandbox", "validation", "operator trial", "unresolved blockers") `
  -PlainEnglish @("First Real Adapter Wiring Candidate identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "First real adapter wiring candidate does not execute adapters") `
  -RouteHref "/first-real-adapter-wiring-candidate"

Write-Host "[OK] CodexForge Phase 791 first real adapter wiring candidate smoke passed."
