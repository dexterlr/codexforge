param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 697 Universal Adapter-Backed Execution Preview Candidate" `
  -ScriptFile "smoke-codexforge-universal-adapter-backed-execution-preview-candidate.ps1" `
  -Domain "src\\lib\\codexforge\\universal-adapter-backed-execution-preview-candidate" `
  -Route "src\\app\\universal-adapter-backed-execution-preview-candidate" `
  -MainPanel "UniversalAdapterBackedExecutionPreviewCandidatePanel" `
  -CommandLabel "Go to Universal Adapter-Backed Execution Preview Candidate" `
  -Modules @("universal-adapter-backed-execution-preview-candidate-model.ts", "index.ts") `
  -Components @("UniversalAdapterBackedExecutionPreviewCandidatePanel.tsx", "index.ts") `
  -Exports @("buildUniversalAdapterBackedExecutionPreviewCandidateStableKey", "buildUniversalAdapterBackedExecutionPreviewCandidate", "buildUniversalAdapterBackedExecutionPreviewCandidates", "buildUniversalAdapterBackedExecutionPreviewCandidateBoundary", "buildUniversalAdapterBackedExecutionPreviewCandidateModel", "summarizeUniversalAdapterBackedExecutionPreviewCandidate", "UNIVERSAL_ADAPTER_BACKED_EXECUTION_PREVIEW_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Universal adapter-backed execution preview candidate", "Universal adapter-backed execution preview candidate does not execute adapters", "Universal adapter-backed execution requires explicit operator approval", "Readiness across all adapter-backed preview families", "Unresolved blockers", "Next recommended action toward first tightly bounded adapter-backed execution implementation", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Universal adapter-backed execution preview candidate identity", "Readiness across all adapter-backed preview families", "File write readiness", "Command runner readiness", "Local runtime readiness", "Provider/model readiness", "Connector readiness", "Automation readiness", "Evidence/result readiness", "Recovery/packaging readiness", "Creative/research/chatbot/game-server readiness", "Unresolved blockers", "Next recommended action toward first tightly bounded adapter-backed execution implementation") `
  -RouteHref "/universal-adapter-backed-execution-preview-candidate"

Write-Host "[OK] CodexForge Phase 697 universal adapter-backed execution preview candidate smoke passed."
