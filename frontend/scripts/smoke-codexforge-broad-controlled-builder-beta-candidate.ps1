param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 793 Broad Controlled Builder Beta Candidate" `
  -ScriptFile "smoke-codexforge-broad-controlled-builder-beta-candidate.ps1" `
  -Domain "src\lib\codexforge\broad-controlled-builder-beta-candidate" `
  -Route "src\app\broad-controlled-builder-beta-candidate" `
  -MainPanel "BroadControlledBuilderBetaCandidatePanel" `
  -CommandLabel "Go to Broad Controlled Builder Beta Candidate" `
  -Modules @("broad-controlled-builder-beta-candidate-model.ts", "index.ts") `
  -Components @("BroadControlledBuilderBetaCandidatePanel.tsx", "index.ts") `
  -Exports @("buildBroadControlledBuilderBetaCandidateStableKey", "buildBroadControlledBuilderBetaCandidate", "buildBroadControlledBuilderBetaCandidateItems", "buildBroadControlledBuilderBetaCandidateBoundary", "buildBroadControlledBuilderBetaCandidateModel", "summarizeBroadControlledBuilderBetaCandidate", "BROAD_CONTROLLED_BUILDER_BETA_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Broad Controlled Builder Beta Candidate", "Broad controlled builder beta candidate does not execute builder workflows from UI", "Broad controlled builder beta requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "coding/project builder", "creative/video", "research/live research", "chatbot/agent", "monitoring/automation", "video-call/meeting", "connector workflows", "game/server builder", "deferred families", "unresolved blockers", "next recommended action", "Original medieval fantasy", "No copied franchise assets") `
  -PlainEnglish @("Broad Controlled Builder Beta Candidate identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Broad controlled builder beta candidate does not execute builder workflows from UI") `
  -RouteHref "/broad-controlled-builder-beta-candidate"

Write-Host "[OK] CodexForge Phase 793 broad controlled builder beta candidate smoke passed."
