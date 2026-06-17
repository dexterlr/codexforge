param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 665 Universal Builder MVP Candidate" `
  -ScriptFile "smoke-codexforge-universal-builder-mvp-candidate.ps1" `
  -Domain "src\lib\codexforge\universal-builder-mvp-candidate" `
  -Route "src\app\universal-builder-mvp-candidate" `
  -MainPanel "UniversalBuilderMvpCandidatePanel" `
  -CommandLabel "Go to Universal Builder MVP Candidate" `
  -Modules @("universal-builder-mvp-candidate-model.ts", "index.ts") `
  -Components @("UniversalBuilderMvpCandidatePanel.tsx", "index.ts") `
  -Exports @("buildUniversalBuilderMvpCandidateStableKey", "buildUniversalBuilderMvpCandidate", "buildUniversalBuilderMvpCandidates", "buildUniversalBuilderMvpCandidateBoundary", "buildUniversalBuilderMvpCandidateModel", "summarizeUniversalBuilderMvpCandidate", "UNIVERSAL_BUILDER_MVP_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Universal builder MVP candidate", "Universal builder MVP candidate does not execute builder workflows", "Universal builder execution requires explicit operator approval", "Not executable yet without approved backend/local/provider/connector/automation/file/command/runtime boundaries", "Coding/project builder readiness", "Creative/video readiness", "Research/live research readiness", "Chatbot/agent readiness", "Monitoring/automation readiness", "Video-call/meeting readiness", "Connector workflow readiness", "Game/server builder readiness", "Original medieval fantasy", "No copied franchise assets") `
  -PlainEnglish @("Universal builder MVP candidate identity", "Coding/project builder readiness", "Creative/video readiness", "Research/live research readiness", "Chatbot/agent readiness", "Monitoring/automation readiness", "Video-call/meeting readiness", "Connector workflow readiness", "Game/server builder readiness", "Original medieval fantasy", "No copied franchise assets", "Next recommended action") `
  -RouteHref "/universal-builder-mvp-candidate"

Write-Host "[OK] CodexForge Phase 665 universal builder MVP candidate smoke passed."
