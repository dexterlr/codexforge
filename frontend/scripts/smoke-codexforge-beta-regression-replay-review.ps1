param([string]$BaseUrl = "http://localhost:3000")

$protectedRoutes = @(
  "/full-smoke-suite-stability-pass",
  "/foundation-beta-candidate",
  "/beta-trial-intake-review",
  "/beta-feedback-inbox",
  "/beta-issue-triage-review",
  "/beta-fix-priority-matrix",
  "/beta-regression-replay-review",
  "/beta-release-notes-draft-review",
  "/release-smoke",
  "/validation"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 388 Beta Regression Replay Review" `
  -ScriptFile "smoke-codexforge-beta-regression-replay-review.ps1" `
  -Domain "src\lib\codexforge\beta-regression-replay-review" `
  -Route "src\app\beta-regression-replay-review" `
  -MainPanel "BetaRegressionReplayReviewPanel" `
  -CommandLabel "Go to Beta Regression Replay Review" `
  -Modules @("beta-regression-replay-review-types.ts","beta-regression-replay-review-summary.ts","index.ts") `
  -Components @("BetaRegressionReplayReviewPanel.tsx","index.ts") `
  -Exports @("buildBetaRegressionReplayReviewStableKey","buildBetaRegressionReplayReview","buildBetaRegressionReplayReviews","buildBetaRegressionReplayReviewBoundary","buildBetaRegressionReplayReviewModel","summarizeBetaRegressionReplayReview","BETA_REGRESSION_REPLAY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Beta regression replay review","Regression replay review does not run tests or workflows","Replay plans require operator approval","Unresolved regressions stay blocked","Replay plan groups","Expected validation evidence") `
  -PlainEnglish @("Regression replay identity","Source fix priority matrix","Blocked replay cases","Smoke/build/manual validation notes","Release notes route","Next recommended action","advanced regression replay details collapsed/secondary") `
  -ExtraRoutes @("/beta-fix-priority-matrix","/beta-release-notes-draft-review","/release-smoke","/validation") `
  -ProtectedRoutes $protectedRoutes
