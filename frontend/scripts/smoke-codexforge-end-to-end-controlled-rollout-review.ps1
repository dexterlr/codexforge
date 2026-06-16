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
  -PhaseName "Phase 555 End-to-End Controlled Rollout Review" `
  -ScriptFile "smoke-codexforge-end-to-end-controlled-rollout-review.ps1" `
  -Domain "src\lib\codexforge\end-to-end-controlled-rollout-review" `
  -Route "src\app\end-to-end-controlled-rollout-review" `
  -MainPanel "EndToEndControlledRolloutReviewPanel" `
  -CommandLabel "Go to End-to-End Controlled Rollout Review" `
  -Modules @("end-to-end-controlled-rollout-review-types.ts", "end-to-end-controlled-rollout-review-summary.ts", "index.ts") `
  -Components @("EndToEndControlledRolloutReviewPanel.tsx", "index.ts") `
  -Exports @("buildEndToEndControlledRolloutReviewStableKey", "buildEndToEndControlledRolloutReview", "buildEndToEndControlledRolloutReviews", "buildEndToEndControlledRolloutReviewBoundary", "buildEndToEndControlledRolloutReviewModel", "summarizeEndToEndControlledRolloutReview", "END_TO_END_CONTROLLED_ROLLOUT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("End-to-end controlled rollout review", "End-to-end controlled rollout review does not proceed automatically", "Rollout decisions require explicit operator approval", "Unresolved rollout review blockers stay blocked", "Rollout review groups", "Operator experience checklist") `
  -PlainEnglish @("Controlled rollout review identity", "Readiness review checklist", "Safety/regression checklist", "Rollback readiness checklist", "Denied rollout review actions", "Unresolved rollout review blockers", "Rollout feedback inbox route", "Rollout regression review route", "next recommended action", "no rollout auto-proceed", "no controlled rollout execution", "no live boundary signoff automation") `
  -RouteHref "/end-to-end-controlled-rollout-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 555 end-to-end controlled rollout review smoke passed."
