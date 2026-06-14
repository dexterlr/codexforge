param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\multi-workflow-regression-review"
$route = "src\app\multi-workflow-regression-review"
$phaseMarkers = @(
  "Multi-workflow regression review",
  "Multi-workflow regression review does not run tests",
  "Regression fixes require explicit operator approval",
  "Unresolved regressions stay blocked",
  "Regression groups",
  "Workflow coverage checklist"
)
$plainEnglish = @(
  "multi-workflow regression identity",
  "approval/evidence/result/recovery regression checklist",
  "provider/local/connector/automation regression checklist",
  "denied regression actions",
  "unresolved regression blockers",
  "multi-workflow release candidate route",
  "controlled live signoff route",
  "next recommended action",
  "no regression/test execution from UI",
  "advanced regression details collapsed/secondary"
)
$newRoutes = @(
  "/multi-workflow-operator-trial-plan",
  "/multi-workflow-trial-review",
  "/multi-workflow-regression-review",
  "/multi-workflow-release-candidate",
  "/controlled-live-capability-signoff",
  "/codexforge-daily-beta-release-candidate",
  "/daily-beta-controlled-operator-trial",
  "/daily-beta-feedback-review"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 508 Multi-Workflow Regression Review" `
  -ScriptFile "smoke-codexforge-multi-workflow-regression-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "MultiWorkflowRegressionReviewPanel" `
  -CommandLabel "Go to Multi-Workflow Regression Review" `
  -Modules @("multi-workflow-regression-review-types.ts","multi-workflow-regression-review-summary.ts","index.ts") `
  -Components @("MultiWorkflowRegressionReviewPanel.tsx","index.ts") `
  -Exports @("buildMultiWorkflowRegressionReviewStableKey","buildMultiWorkflowRegressionReview","buildMultiWorkflowRegressionReviews","buildMultiWorkflowRegressionReviewBoundary","buildMultiWorkflowRegressionReviewModel","summarizeMultiWorkflowRegressionReview","MULTI_WORKFLOW_REGRESSION_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/multi-workflow-trial-review","/multi-workflow-release-candidate","/controlled-live-capability-signoff","/real-daily-workflow-recovery-review") `
  -ProtectedRoutes $newRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Multi-Workflow Regression Review smoke passed."
