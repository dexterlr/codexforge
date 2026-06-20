param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1049 Controlled Build Plan Bundle Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-build-plan-bundle-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-build-plan-bundle-release-candidate" `
  -Route "src\app\controlled-build-plan-bundle-release-candidate" `
  -MainPanel "ControlledBuildPlanBundleReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Build Plan Bundle Release Candidate" `
  -Modules @("controlled-build-plan-bundle-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledBuildPlanBundleReleaseCandidateStableKey", "buildControlledBuildPlanBundleReleaseCandidate", "buildControlledBuildPlanBundleReleaseCandidateItems", "buildControlledBuildPlanBundleReleaseCandidateBoundary", "buildControlledBuildPlanBundleReleaseCandidateModel", "summarizeControlledBuildPlanBundleReleaseCandidate", "CONTROLLED_BUILD_PLAN_BUNDLE_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled build plan bundle release candidate", "Controlled build plan bundle release candidate does not call models or execute adapters", "Controlled build plan release requires explicit operator approval", "Release candidate supports build anything goals with shared brain gates", "Denied controlled build plan bundle paths remain blocked", "Controlled build plan bundle release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled build plan bundle release candidate does not call models or execute adapters", "Controlled build plan release requires explicit operator approval", "Denied controlled build plan bundle paths remain blocked") `
  -RouteHref "/controlled-build-plan-bundle-release-candidate"

Write-Host "[OK] CodexForge Phase 1049 Controlled Build Plan Bundle Release Candidate smoke passed."
