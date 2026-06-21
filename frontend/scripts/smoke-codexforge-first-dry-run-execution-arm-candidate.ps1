param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1096 First Dry-Run Execution Arm Candidate" `
  -ScriptFile "smoke-codexforge-first-dry-run-execution-arm-candidate.ps1" `
  -Domain "src\lib\codexforge\first-dry-run-execution-arm-candidate" `
  -Route "src\app\first-dry-run-execution-arm-candidate" `
  -MainPanel "FirstDryRunExecutionArmCandidatePanel" `
  -CommandLabel "Go to First Dry-Run Execution Arm Candidate" `
  -Modules @("first-dry-run-execution-arm-candidate-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildFirstDryRunExecutionArmCandidateStableKey", "buildFirstDryRunExecutionArmCandidate", "buildFirstDryRunExecutionArmCandidateItems", "buildFirstDryRunExecutionArmCandidateBoundary", "buildFirstDryRunExecutionArmCandidateModel", "summarizeFirstDryRunExecutionArmCandidate", "FIRST_DRY_RUN_EXECUTION_ARM_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First dry-run execution arm candidate", "First dry-run execution arm candidate does not execute builds", "Dry-run execution arm candidates require explicit operator approval", "Candidate packets combine dry-run tickets trace validation operator review and hold release gates", "Denied dry-run execution arm candidate paths remain blocked", "First dry-run execution arm checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First dry-run execution arm candidate does not execute builds", "Dry-run execution arm candidates require explicit operator approval", "Denied dry-run execution arm candidate paths remain blocked") `
  -RouteHref "/first-dry-run-execution-arm-candidate"

Write-Host "[OK] CodexForge Phase 1096 First Dry-Run Execution Arm Candidate smoke passed."
