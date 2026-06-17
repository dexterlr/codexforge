param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 649 Universal Builder Controlled Trial Candidate" `
  -ScriptFile "smoke-codexforge-universal-builder-controlled-trial-candidate.ps1" `
  -Domain "src\lib\codexforge\universal-builder-controlled-trial-candidate" `
  -Route "src\app\universal-builder-controlled-trial-candidate" `
  -MainPanel "UniversalBuilderControlledTrialCandidatePanel" `
  -CommandLabel "Go to Universal Builder Controlled Trial Candidate" `
  -Modules @("universal-builder-controlled-trial-candidate-model.ts", "index.ts") `
  -Components @("UniversalBuilderControlledTrialCandidatePanel.tsx", "index.ts") `
  -Exports @("buildUniversalBuilderControlledTrialCandidateStableKey", "buildUniversalBuilderControlledTrialCandidate", "buildUniversalBuilderControlledTrialCandidates", "buildUniversalBuilderControlledTrialCandidateBoundary", "buildUniversalBuilderControlledTrialCandidateModel", "summarizeUniversalBuilderControlledTrialCandidate", "UNIVERSAL_BUILDER_CONTROLLED_TRIAL_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Universal builder controlled trial candidate", "Universal builder controlled trial candidate does not execute builder workflows", "Builder controlled trials require explicit operator approval", "Coding builder readiness", "Creative/video builder readiness", "Research builder readiness", "Chatbot/agent builder readiness", "Monitoring/automation builder readiness", "Video-call/meeting builder readiness", "Connector builder readiness", "Game/server builder readiness", "Original medieval fantasy", "No copied franchise assets", "Unresolved builder blockers") `
  -PlainEnglish @("Universal builder controlled trial candidate identity", "Coding builder readiness", "Creative/video builder readiness", "Research builder readiness", "Chatbot/agent builder readiness", "Monitoring/automation builder readiness", "Video-call/meeting builder readiness", "Connector builder readiness", "Game/server builder readiness", "Unresolved builder blockers", "Next recommended action") `
  -RouteHref "/universal-builder-controlled-trial-candidate"

Write-Host "[OK] CodexForge Phase 649 universal builder controlled trial candidate smoke passed."
