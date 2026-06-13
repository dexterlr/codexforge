param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\beta-workflow-documentation-review"
$route = "src\app\beta-workflow-documentation-review"
$phaseMarkers = @(
  "Beta workflow documentation review",
  "Beta workflow documentation review does not publish documentation automatically",
  "Documentation changes require explicit operator approval",
  "Stale documentation blockers stay blocked",
  "Documentation groups",
  "Operator runbook checklist"
)
$plainEnglish = @(
  "beta workflow documentation identity",
  "checkpoint doc checklist",
  "safety wording checklist",
  "denied documentation shortcuts",
  "unresolved documentation blockers",
  "onboarding final pass route",
  "Beta 2 release candidate route",
  "next recommended action",
  "no documentation publish behavior",
  "advanced documentation details collapsed/secondary"
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
  -PhaseName "Phase 484 Beta Workflow Documentation Review" `
  -ScriptFile "smoke-codexforge-beta-workflow-documentation-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "BetaWorkflowDocumentationReviewPanel" `
  -CommandLabel "Go to Beta Workflow Documentation Review" `
  -Modules @("beta-workflow-documentation-review-types.ts","beta-workflow-documentation-review-summary.ts","index.ts") `
  -Components @("BetaWorkflowDocumentationReviewPanel.tsx","index.ts") `
  -Exports @("buildBetaWorkflowDocumentationReviewStableKey","buildBetaWorkflowDocumentationReview","buildBetaWorkflowDocumentationReviews","buildBetaWorkflowDocumentationReviewBoundary","buildBetaWorkflowDocumentationReviewModel","summarizeBetaWorkflowDocumentationReview","BETA_WORKFLOW_DOCUMENTATION_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/beta-workflow-release-regression-review","/beta-workflow-safety-signoff-review","/beta-workflow-onboarding-final-pass","/codexforge-beta-2-release-candidate") `
  -ProtectedRoutes $protectedRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

Write-Host "[OK] CodexForge Beta Workflow Documentation Review smoke passed."
