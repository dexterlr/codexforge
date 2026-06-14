param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\multi-workflow-trial-review"
$route = "src\app\multi-workflow-trial-review"
$phaseMarkers = @(
  "Multi-workflow trial review",
  "Multi-workflow trial review does not launch trials",
  "Trial actions require explicit operator approval",
  "Unresolved trial blockers stay blocked",
  "Trial comparison groups",
  "Evidence result recovery review checklist"
)
$plainEnglish = @(
  "multi-workflow trial review identity",
  "operator readiness checklist",
  "approval/safety checklist",
  "denied trial actions",
  "unresolved trial blockers",
  "multi-workflow regression route",
  "multi-workflow release candidate route",
  "next recommended action",
  "no trial launch",
  "advanced trial details collapsed/secondary"
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
  -PhaseName "Phase 507 Multi-Workflow Trial Review" `
  -ScriptFile "smoke-codexforge-multi-workflow-trial-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "MultiWorkflowTrialReviewPanel" `
  -CommandLabel "Go to Multi-Workflow Trial Review" `
  -Modules @("multi-workflow-trial-review-types.ts","multi-workflow-trial-review-summary.ts","index.ts") `
  -Components @("MultiWorkflowTrialReviewPanel.tsx","index.ts") `
  -Exports @("buildMultiWorkflowTrialReviewStableKey","buildMultiWorkflowTrialReview","buildMultiWorkflowTrialReviews","buildMultiWorkflowTrialReviewBoundary","buildMultiWorkflowTrialReviewModel","summarizeMultiWorkflowTrialReview","MULTI_WORKFLOW_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/multi-workflow-operator-trial-plan","/multi-workflow-regression-review","/multi-workflow-release-candidate","/real-daily-workflow-evidence-review") `
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

Write-Host "[OK] CodexForge Multi-Workflow Trial Review smoke passed."
