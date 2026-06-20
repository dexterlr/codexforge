param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1033 Controlled Guided Build Workflow Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-guided-build-workflow-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-guided-build-workflow-release-candidate" `
  -Route "src\app\controlled-guided-build-workflow-release-candidate" `
  -MainPanel "ControlledGuidedBuildWorkflowReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Guided Build Workflow Release Candidate" `
  -Modules @("controlled-guided-build-workflow-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledGuidedBuildWorkflowReleaseCandidateStableKey", "buildControlledGuidedBuildWorkflowReleaseCandidate", "buildControlledGuidedBuildWorkflowReleaseCandidateItems", "buildControlledGuidedBuildWorkflowReleaseCandidateBoundary", "buildControlledGuidedBuildWorkflowReleaseCandidateModel", "summarizeControlledGuidedBuildWorkflowReleaseCandidate", "CONTROLLED_GUIDED_BUILD_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled guided build workflow release candidate", "Controlled guided build workflow release candidate does not call models or execute adapters", "Controlled guided build release requires explicit operator approval", "Release candidate supports build anything goals with shared brain gates", "Denied controlled guided build workflow paths remain blocked", "Controlled guided build workflow release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled guided build workflow release candidate does not call models or execute adapters", "Controlled guided build release requires explicit operator approval", "Denied controlled guided build workflow paths remain blocked") `
  -RouteHref "/controlled-guided-build-workflow-release-candidate"

Write-Host "[OK] CodexForge Phase 1033 Controlled Guided Build Workflow Release Candidate smoke passed."
