param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1097 Controlled Dry-Run Execution Handoff Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-dry-run-execution-handoff-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-dry-run-execution-handoff-release-candidate" `
  -Route "src\app\controlled-dry-run-execution-handoff-release-candidate" `
  -MainPanel "ControlledDryRunExecutionHandoffReleaseCandidatePanel" `
  -CommandLabel "Go to Controlled Dry-Run Execution Handoff Release Candidate" `
  -Modules @("controlled-dry-run-execution-handoff-release-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildControlledDryRunExecutionHandoffReleaseCandidateStableKey", "buildControlledDryRunExecutionHandoffReleaseCandidate", "buildControlledDryRunExecutionHandoffReleaseCandidateItems", "buildControlledDryRunExecutionHandoffReleaseCandidateBoundary", "buildControlledDryRunExecutionHandoffReleaseCandidateModel", "summarizeControlledDryRunExecutionHandoffReleaseCandidate", "CONTROLLED_DRY_RUN_EXECUTION_HANDOFF_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Controlled dry-run execution handoff release candidate", "Controlled dry-run execution handoff release candidate does not call models or execute adapters", "Controlled dry-run execution handoff release requires explicit operator approval", "Release candidate supports build anything dry-run tickets with shared brain gates", "Denied controlled dry-run execution handoff paths remain blocked", "Controlled dry-run execution handoff release checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Controlled dry-run execution handoff release candidate does not call models or execute adapters", "Controlled dry-run execution handoff release requires explicit operator approval", "Denied controlled dry-run execution handoff paths remain blocked") `
  -RouteHref "/controlled-dry-run-execution-handoff-release-candidate"

Write-Host "[OK] CodexForge Phase 1097 Controlled Dry-Run Execution Handoff Release Candidate smoke passed."
