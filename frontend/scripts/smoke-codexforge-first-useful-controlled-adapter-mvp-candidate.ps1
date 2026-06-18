param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 761 First Useful Controlled Adapter MVP Candidate" `
  -ScriptFile "smoke-codexforge-first-useful-controlled-adapter-mvp-candidate.ps1" `
  -Domain "src\lib\codexforge\first-useful-controlled-adapter-mvp-candidate" `
  -Route "src\app\first-useful-controlled-adapter-mvp-candidate" `
  -MainPanel "FirstUsefulControlledAdapterMvpCandidatePanel" `
  -CommandLabel "Go to First Useful Controlled Adapter MVP Candidate" `
  -Modules @("first-useful-controlled-adapter-mvp-candidate-model.ts", "index.ts") `
  -Components @("FirstUsefulControlledAdapterMvpCandidatePanel.tsx", "index.ts") `
  -Exports @("buildFirstUsefulControlledAdapterMvpCandidateStableKey", "buildFirstUsefulControlledAdapterMvpCandidate", "buildFirstUsefulControlledAdapterMvpCandidateItems", "buildFirstUsefulControlledAdapterMvpCandidateBoundary", "buildFirstUsefulControlledAdapterMvpCandidateModel", "summarizeFirstUsefulControlledAdapterMvpCandidate", "FIRST_USEFUL_CONTROLLED_ADAPTER_MVP_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First Useful Controlled Adapter MVP Candidate", "First useful controlled adapter MVP candidate does not execute adapters", "Useful controlled adapter MVP execution requires explicit operator approval", "First useful MVP readiness", "File write", "Command runner", "Local runtime", "Evidence store", "Result store", "Recovery", "Packaging", "Project scaffold", "Harness", "Sandbox", "Audit", "Operator trial", "Evidence review", "Deferred families", "Unresolved blockers", "Next recommended action") `
  -PlainEnglish @("First Useful Controlled Adapter MVP Candidate identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "provider/model, connector, automation, creative, research, chatbot, game/server", "first actual bounded file-write request contract") `
  -RouteHref "/first-useful-controlled-adapter-mvp-candidate"

Write-Host "[OK] CodexForge Phase 761 first useful controlled adapter MVP candidate smoke passed."
