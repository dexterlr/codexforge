param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 985 Controlled Universal Game Builder Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-universal-game-builder-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-universal-game-builder-release-candidate" `
  -Route "src\app\controlled-universal-game-builder-release-candidate" `
  -MainPanel "ControlledUniversalGameBuilderReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Universal Game Builder Release Candidate" `
  -Modules @("controlled-universal-game-builder-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledUniversalGameBuilderReleaseCandidateStableKey", "buildControlledUniversalGameBuilderReleaseCandidate", "buildControlledUniversalGameBuilderReleaseCandidateItems", "buildControlledUniversalGameBuilderReleaseCandidateBoundary", "buildControlledUniversalGameBuilderReleaseCandidateModel", "summarizeControlledUniversalGameBuilderReleaseCandidate", "CONTROLLED_UNIVERSAL_GAME_BUILDER_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled universal game builder release candidate", "Controlled universal game builder release candidate does not call models or execute adapters", "Controlled game builder release requires explicit operator approval", "Release candidate supports any supported game target with shared brain gates", "Denied controlled universal game builder release paths remain blocked", "Controlled universal game builder release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled universal game builder release candidate does not call models or execute adapters", "Controlled game builder release requires explicit operator approval", "Denied controlled universal game builder release paths remain blocked") `
  -RouteHref "/controlled-universal-game-builder-release-candidate"

Write-Host "[OK] CodexForge Phase 985 Controlled Universal Game Builder Release Candidate smoke passed."