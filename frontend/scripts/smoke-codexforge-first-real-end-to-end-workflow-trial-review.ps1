param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/codexforge-daily-beta-1-candidate",
  "/daily-beta-1-controlled-rollout-plan",
  "/daily-beta-1-rollout-review",
  "/daily-beta-1-feedback-inbox",
  "/daily-beta-1-feedback-triage-review",
  "/daily-beta-1-regression-review",
  "/daily-beta-1-hardening-pass",
  "/daily-beta-1-documentation-refresh",
  "/daily-beta-1-release-notes-review",
  "/daily-beta-1-operator-handoff-packet",
  "/daily-beta-1-final-safety-review",
  "/codexforge-daily-beta-1-release-candidate",
  "/daily-beta-1-controlled-trial-result-review",
  "/daily-beta-1-controlled-trial-recovery-review",
  "/daily-beta-1-controlled-trial-hardening",
  "/live-backend-boundary-inventory",
  "/provider-execution-boundary-readiness-review",
  "/local-model-execution-boundary-readiness-review",
  "/connector-execution-boundary-readiness-review",
  "/automation-execution-boundary-readiness-review",
  "/file-mutation-boundary-readiness-review",
  "/test-execution-boundary-readiness-review",
  "/unified-execution-boundary-gap-report",
  "/first-approved-provider-execution-trial",
  "/first-approved-local-model-execution-trial",
  "/first-approved-connector-access-trial",
  "/first-approved-automation-dry-run-trial",
  "/first-approved-file-patch-dry-run",
  "/first-approved-test-execution-trial",
  "/first-real-end-to-end-workflow-trial-plan",
  "/first-real-end-to-end-workflow-trial-review",
  "/end-to-end-workflow-evidence-review",
  "/end-to-end-workflow-result-review",
  "/end-to-end-workflow-recovery-review",
  "/end-to-end-workflow-hardening-pass",
  "/codexforge-end-to-end-workflow-release-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 548 First Real End-to-End Workflow Trial Review" `
  -ScriptFile "smoke-codexforge-first-real-end-to-end-workflow-trial-review.ps1" `
  -Domain "src\lib\codexforge\first-real-end-to-end-workflow-trial-review" `
  -Route "src\app\first-real-end-to-end-workflow-trial-review" `
  -MainPanel "FirstRealEndToEndWorkflowTrialReviewPanel" `
  -CommandLabel "Go to First Real End-to-End Workflow Trial Review" `
  -Modules @("first-real-end-to-end-workflow-trial-review-types.ts", "first-real-end-to-end-workflow-trial-review-summary.ts", "index.ts") `
  -Components @("FirstRealEndToEndWorkflowTrialReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstRealEndToEndWorkflowTrialReviewStableKey", "buildFirstRealEndToEndWorkflowTrialReview", "buildFirstRealEndToEndWorkflowTrialReviews", "buildFirstRealEndToEndWorkflowTrialReviewBoundary", "buildFirstRealEndToEndWorkflowTrialReviewModel", "summarizeFirstRealEndToEndWorkflowTrialReview", "FIRST_REAL_END_TO_END_WORKFLOW_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First real end-to-end workflow trial review", "First real end-to-end workflow trial review does not execute workflows", "End-to-end trial decisions require explicit operator approval", "Unresolved end-to-end trial blockers stay blocked", "Trial review groups", "Boundary readiness checklist") `
  -PlainEnglish @("End-to-end workflow trial review identity", "Approval/evidence/result/recovery checklist", "Operator decision checklist", "Denied trial review actions", "Unresolved trial review blockers", "End-to-end evidence review route", "End-to-end result review route", "next recommended action") `
  -RouteHref "/first-real-end-to-end-workflow-trial-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 548 first real end-to-end workflow trial review smoke passed."
