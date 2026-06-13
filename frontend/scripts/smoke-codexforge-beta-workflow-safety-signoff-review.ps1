param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\beta-workflow-safety-signoff-review"
$route = "src\app\beta-workflow-safety-signoff-review"
$phaseMarkers = @(
  "Beta workflow safety signoff review",
  "Beta workflow safety signoff review does not approve release automatically",
  "Safety signoff requires explicit operator approval",
  "Unresolved safety blockers stay blocked",
  "Signoff groups",
  "Data privacy checklist"
)
$plainEnglish = @(
  "beta workflow safety signoff identity",
  "approval boundary checklist",
  "provider/local/connector/automation safety checklist",
  "denied signoff shortcuts",
  "unresolved signoff blockers",
  "documentation review route",
  "onboarding final pass route",
  "next recommended action",
  "no automatic safety signoff",
  "no safety signoff automation",
  "advanced signoff details collapsed/secondary"
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
  -PhaseName "Phase 483 Beta Workflow Safety Signoff Review" `
  -ScriptFile "smoke-codexforge-beta-workflow-safety-signoff-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "BetaWorkflowSafetySignoffReviewPanel" `
  -CommandLabel "Go to Beta Workflow Safety Signoff Review" `
  -Modules @("beta-workflow-safety-signoff-review-types.ts","beta-workflow-safety-signoff-review-summary.ts","index.ts") `
  -Components @("BetaWorkflowSafetySignoffReviewPanel.tsx","index.ts") `
  -Exports @("buildBetaWorkflowSafetySignoffReviewStableKey","buildBetaWorkflowSafetySignoffReview","buildBetaWorkflowSafetySignoffReviews","buildBetaWorkflowSafetySignoffReviewBoundary","buildBetaWorkflowSafetySignoffReviewModel","summarizeBetaWorkflowSafetySignoffReview","BETA_WORKFLOW_SAFETY_SIGNOFF_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/beta-workflow-release-regression-review","/beta-workflow-documentation-review","/beta-workflow-onboarding-final-pass","/codexforge-beta-2-release-candidate") `
  -ProtectedRoutes $protectedRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

Write-Host "[OK] CodexForge Beta Workflow Safety Signoff Review smoke passed."
