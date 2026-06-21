param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1110 Simulated File Operator Review" `
  -ScriptFile "smoke-codexforge-simulated-file-operator-review.ps1" `
  -Domain "src\lib\codexforge\simulated-file-operator-review" `
  -Route "src\app\simulated-file-operator-review" `
  -MainPanel "SimulatedFileOperatorReviewPanel" `
  -CommandLabel "Go to Simulated File Operator Review" `
  -Modules @("simulated-file-operator-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileOperatorReviewStableKey", "buildSimulatedFileOperatorReview", "buildSimulatedFileOperatorReviewItems", "buildSimulatedFileOperatorReviewBoundary", "buildSimulatedFileOperatorReviewModel", "summarizeSimulatedFileOperatorReview", "SIMULATED_FILE_OPERATOR_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated file operator review", "Simulated file operator review does not approve actions", "File operator review requires explicit human approval", "Operator reviews keep file mutations blocked", "Denied simulated file operator review paths remain blocked", "Simulated file operator review checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file operator review does not approve actions", "File operator review requires explicit human approval", "Denied simulated file operator review paths remain blocked") `
  -RouteHref "/simulated-file-operator-review"

Write-Host "[OK] CodexForge Phase 1110 Simulated File Operator Review smoke passed."
