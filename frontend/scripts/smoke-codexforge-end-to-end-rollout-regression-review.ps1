param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/codexforge-end-to-end-workflow-release-candidate",
  "/end-to-end-controlled-rollout-plan",
  "/end-to-end-controlled-rollout-review",
  "/end-to-end-rollout-feedback-inbox",
  "/end-to-end-rollout-regression-review",
  "/end-to-end-rollout-hardening-pass",
  "/live-execution-boundary-final-signoff",
  "/codexforge-end-to-end-daily-beta-candidate",
  "/end-to-end-daily-beta-operator-handoff"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 557 End-to-End Rollout Regression Review" `
  -ScriptFile "smoke-codexforge-end-to-end-rollout-regression-review.ps1" `
  -Domain "src\lib\codexforge\end-to-end-rollout-regression-review" `
  -Route "src\app\end-to-end-rollout-regression-review" `
  -MainPanel "EndToEndRolloutRegressionReviewPanel" `
  -CommandLabel "Go to End-to-End Rollout Regression Review" `
  -Modules @("end-to-end-rollout-regression-review-types.ts", "end-to-end-rollout-regression-review-summary.ts", "index.ts") `
  -Components @("EndToEndRolloutRegressionReviewPanel.tsx", "index.ts") `
  -Exports @("buildEndToEndRolloutRegressionReviewStableKey", "buildEndToEndRolloutRegressionReview", "buildEndToEndRolloutRegressionReviews", "buildEndToEndRolloutRegressionReviewBoundary", "buildEndToEndRolloutRegressionReviewModel", "summarizeEndToEndRolloutRegressionReview", "END_TO_END_ROLLOUT_REGRESSION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("End-to-end rollout regression review", "End-to-end rollout regression review does not run tests", "Rollout regression fixes require explicit operator approval", "Unresolved rollout regressions stay blocked", "Regression groups", "File test regression checklist") `
  -PlainEnglish @("Rollout regression review identity", "Workflow regression checklist", "Provider/local/connector/automation regression checklist", "Feedback regression checklist", "Denied regression actions", "Unresolved regression blockers", "Rollout hardening route", "Final live boundary signoff route", "next recommended action", "no rollout regression/test execution", "no regression/test execution from UI", "no hardening apply behavior") `
  -RouteHref "/end-to-end-rollout-regression-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 557 end-to-end rollout regression review smoke passed."
