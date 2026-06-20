param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1001 Controlled Universal Project Builder Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-universal-project-builder-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-universal-project-builder-release-candidate" `
  -Route "src\app\controlled-universal-project-builder-release-candidate" `
  -MainPanel "ControlledUniversalProjectBuilderReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Universal Project Builder Release Candidate" `
  -Modules @("controlled-universal-project-builder-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledUniversalProjectBuilderReleaseCandidateStableKey", "buildControlledUniversalProjectBuilderReleaseCandidate", "buildControlledUniversalProjectBuilderReleaseCandidateItems", "buildControlledUniversalProjectBuilderReleaseCandidateBoundary", "buildControlledUniversalProjectBuilderReleaseCandidateModel", "summarizeControlledUniversalProjectBuilderReleaseCandidate", "CONTROLLED_UNIVERSAL_PROJECT_BUILDER_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled universal project builder release candidate", "Controlled universal project builder release candidate does not call models or execute adapters", "Controlled universal project builder release requires explicit operator approval", "Release candidate supports any supported project target with shared brain gates", "Denied controlled universal project builder release paths remain blocked", "Controlled universal project builder release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled universal project builder release candidate does not call models or execute adapters", "Controlled universal project builder release requires explicit operator approval", "Denied controlled universal project builder release paths remain blocked") `
  -RouteHref "/controlled-universal-project-builder-release-candidate"

Write-Host "[OK] CodexForge Phase 1001 Controlled Universal Project Builder Release Candidate smoke passed."
