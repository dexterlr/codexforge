param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1017 Controlled Universal Builder Cockpit Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-universal-builder-cockpit-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-universal-builder-cockpit-release-candidate" `
  -Route "src\app\controlled-universal-builder-cockpit-release-candidate" `
  -MainPanel "ControlledUniversalBuilderCockpitReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Universal Builder Cockpit Release Candidate" `
  -Modules @("controlled-universal-builder-cockpit-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledUniversalBuilderCockpitReleaseCandidateStableKey", "buildControlledUniversalBuilderCockpitReleaseCandidate", "buildControlledUniversalBuilderCockpitReleaseCandidateItems", "buildControlledUniversalBuilderCockpitReleaseCandidateBoundary", "buildControlledUniversalBuilderCockpitReleaseCandidateModel", "summarizeControlledUniversalBuilderCockpitReleaseCandidate", "CONTROLLED_UNIVERSAL_BUILDER_COCKPIT_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled universal builder cockpit release candidate", "Controlled universal builder cockpit release candidate does not call models or execute adapters", "Controlled universal builder cockpit release requires explicit operator approval", "Release candidate supports build anything goals with shared brain gates", "Denied controlled universal builder cockpit paths remain blocked", "Controlled universal builder cockpit release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled universal builder cockpit release candidate does not call models or execute adapters", "Controlled universal builder cockpit release requires explicit operator approval", "Denied controlled universal builder cockpit paths remain blocked") `
  -RouteHref "/controlled-universal-builder-cockpit-release-candidate"

Write-Host "[OK] CodexForge Phase 1017 Controlled Universal Builder Cockpit Release Candidate smoke passed."
