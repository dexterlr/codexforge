param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\beta-workflow-release-regression-review"
$route = "src\app\beta-workflow-release-regression-review"
$phaseMarkers = @(
  "Beta workflow release regression review",
  "Beta workflow release regression review does not run tests",
  "Regression fixes require explicit operator approval",
  "Unresolved beta regressions stay blocked",
  "Regression groups",
  "Provider local connector automation coverage checklist"
)
$plainEnglish = @(
  "beta workflow regression identity",
  "beta workflow route coverage checklist",
  "safety regression checklist",
  "denied regression actions",
  "unresolved regression risks",
  "safety signoff route",
  "documentation review route",
  "next recommended action",
  "no release approval automation",
  "no regression/test execution from UI",
  "advanced regression review details collapsed/secondary"
)
$protectedRoutes = @(
  "/beta-workflow-release-regression-review",
  "/beta-workflow-safety-signoff-review",
  "/beta-workflow-documentation-review",
  "/beta-workflow-onboarding-final-pass",
  "/codexforge-beta-2-release-candidate",
  "/beta-2-controlled-operator-trial",
  "/beta-2-operator-feedback-review",
  "/beta-2-hardening-pass"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 482 Beta Workflow Release Regression Review" `
  -ScriptFile "smoke-codexforge-beta-workflow-release-regression-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "BetaWorkflowReleaseRegressionReviewPanel" `
  -CommandLabel "Go to Beta Workflow Release Regression Review" `
  -Modules @("beta-workflow-release-regression-review-types.ts","beta-workflow-release-regression-review-summary.ts","index.ts") `
  -Components @("BetaWorkflowReleaseRegressionReviewPanel.tsx","index.ts") `
  -Exports @("buildBetaWorkflowReleaseRegressionReviewStableKey","buildBetaWorkflowReleaseRegressionReview","buildBetaWorkflowReleaseRegressionReviews","buildBetaWorkflowReleaseRegressionReviewBoundary","buildBetaWorkflowReleaseRegressionReviewModel","summarizeBetaWorkflowReleaseRegressionReview","BETA_WORKFLOW_RELEASE_REGRESSION_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/beta-operator-workflow-release-candidate","/beta-workflow-safety-signoff-review","/beta-workflow-documentation-review","/codexforge-beta-2-release-candidate") `
  -ProtectedRoutes $protectedRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

Write-Host "[OK] CodexForge Beta Workflow Release Regression Review smoke passed."
