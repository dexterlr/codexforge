param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 681 Universal Execution Adapter MVP Candidate" `
  -ScriptFile "smoke-codexforge-universal-execution-adapter-mvp-candidate.ps1" `
  -Domain "src\lib\codexforge\universal-execution-adapter-mvp-candidate" `
  -Route "src\app\universal-execution-adapter-mvp-candidate" `
  -MainPanel "UniversalExecutionAdapterMvpCandidatePanel" `
  -CommandLabel "Go to Universal Execution Adapter MVP Candidate" `
  -Modules @("universal-execution-adapter-mvp-candidate-model.ts", "index.ts") `
  -Components @("UniversalExecutionAdapterMvpCandidatePanel.tsx", "index.ts") `
  -Exports @("buildUniversalExecutionAdapterMvpCandidateStableKey", "buildUniversalExecutionAdapterMvpCandidate", "buildUniversalExecutionAdapterMvpCandidates", "buildUniversalExecutionAdapterMvpCandidateBoundary", "buildUniversalExecutionAdapterMvpCandidateModel", "summarizeUniversalExecutionAdapterMvpCandidate", "UNIVERSAL_EXECUTION_ADAPTER_MVP_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Universal execution adapter MVP candidate", "Universal execution adapter MVP candidate does not execute adapters", "Adapter MVP execution requires explicit operator approval", "Adapter not executable from UI", "Readiness across all adapter families", "Unresolved blockers", "First adapter-backed execution preview", "Original medieval fantasy", "No copied franchise assets") `
  -PlainEnglish @("Universal execution adapter MVP candidate identity", "Readiness across all adapter families", "File write readiness", "Command runner readiness", "Local runtime readiness", "Provider/model readiness", "Connector readiness", "Automation readiness", "Evidence/result readiness", "Recovery/packaging readiness", "Creative/research/chatbot/game-server readiness", "Unresolved blockers", "First adapter-backed execution preview", "Original medieval fantasy", "No copied franchise assets", "Next recommended action") `
  -RouteHref "/universal-execution-adapter-mvp-candidate"

Write-Host "[OK] CodexForge Phase 681 universal execution adapter MVP candidate smoke passed."
