param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 626 Result Review Boundary" `
  -ScriptFile "smoke-codexforge-result-review-boundary.ps1" `
  -Domain "src\lib\codexforge\result-review-boundary" `
  -Route "src\app\result-review-boundary" `
  -MainPanel "ResultReviewBoundaryPanel" `
  -CommandLabel "Go to Result Review Boundary" `
  -Modules @("result-review-boundary-types.ts", "result-review-boundary-summary.ts", "index.ts") `
  -Components @("ResultReviewBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildResultReviewBoundaryStableKey", "buildResultReviewBoundary", "buildResultReviewBoundaries", "buildResultReviewBoundaryBoundary", "buildResultReviewBoundaryModel", "summarizeResultReviewBoundary", "RESULT_REVIEW_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Result review boundary", "Result review boundary does not store or reuse outputs automatically", "Result reuse persistence requires explicit operator approval", "Unsafe results stay blocked", "Result groups", "Persistence checklist") `
  -PlainEnglish @("Result review boundary identity", "Acceptance/rejection checklist", "Reuse checklist", "Safety/privacy checklist", "Denied result actions", "Unresolved result blockers", "Recovery boundary route", "Packaging/export boundary route", "Next recommended action") `
  -RouteHref "/result-review-boundary"

Write-Host "[OK] CodexForge Phase 626 result review boundary smoke passed."
