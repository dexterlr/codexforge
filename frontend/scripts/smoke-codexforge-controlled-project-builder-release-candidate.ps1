param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 969 Controlled Project Builder Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-project-builder-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-project-builder-release-candidate" `
  -Route "src\app\controlled-project-builder-release-candidate" `
  -MainPanel "ControlledProjectBuilderReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Project Builder Release Candidate" `
  -Modules @("controlled-project-builder-release-candidate-model.ts", "index.ts") `
  -Components @("ControlledProjectBuilderReleaseCandidatePanel.tsx", "index.ts") `
  -Exports @("buildControlledProjectBuilderReleaseCandidateStableKey", "buildControlledProjectBuilderReleaseCandidate", "buildControlledProjectBuilderReleaseCandidateItems", "buildControlledProjectBuilderReleaseCandidateBoundary", "buildControlledProjectBuilderReleaseCandidateModel", "summarizeControlledProjectBuilderReleaseCandidate", "CONTROLLED_PROJECT_BUILDER_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled project builder release candidate", "Controlled project builder release candidate does not call models or execute adapters", "Controlled project builder release requires explicit operator approval", "Release candidate preserves model routing backend adapter and shared brain gates", "Denied controlled project builder release paths remain blocked", "Controlled project builder release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled project builder release candidate does not call models or execute adapters", "Controlled project builder release requires explicit operator approval", "Denied controlled project builder release paths remain blocked") `
  -RouteHref "/controlled-project-builder-release-candidate"

Write-Host "[OK] CodexForge Phase 969 Controlled project builder release candidate smoke passed."
