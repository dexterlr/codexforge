param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1094 Dry-Run Execution Operator Review" `
  -ScriptFile "smoke-codexforge-dry-run-execution-operator-review.ps1" `
  -Domain "src\lib\codexforge\dry-run-execution-operator-review" `
  -Route "src\app\dry-run-execution-operator-review" `
  -MainPanel "DryRunExecutionOperatorReviewPanel" `
  -CommandLabel "Go to Dry-Run Execution Operator Review" `
  -Modules @("dry-run-execution-operator-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunExecutionOperatorReviewStableKey", "buildDryRunExecutionOperatorReview", "buildDryRunExecutionOperatorReviewItems", "buildDryRunExecutionOperatorReviewBoundary", "buildDryRunExecutionOperatorReviewModel", "summarizeDryRunExecutionOperatorReview", "DRY_RUN_EXECUTION_OPERATOR_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Dry-run execution operator review", "Dry-run execution operator review does not approve actions", "Operator review requires explicit human approval", "Operator reviews keep model backend and domain actions blocked", "Denied dry-run execution operator review paths remain blocked", "Dry-run execution operator review checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run execution operator review does not approve actions", "Operator review requires explicit human approval", "Denied dry-run execution operator review paths remain blocked") `
  -RouteHref "/dry-run-execution-operator-review"

Write-Host "[OK] CodexForge Phase 1094 Dry-Run Execution Operator Review smoke passed."
