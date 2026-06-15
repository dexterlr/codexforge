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
  -PhaseName "Phase 550 End-to-End Workflow Result Review" `
  -ScriptFile "smoke-codexforge-end-to-end-workflow-result-review.ps1" `
  -Domain "src\lib\codexforge\end-to-end-workflow-result-review" `
  -Route "src\app\end-to-end-workflow-result-review" `
  -MainPanel "EndToEndWorkflowResultReviewPanel" `
  -CommandLabel "Go to End-to-End Workflow Result Review" `
  -Modules @("end-to-end-workflow-result-review-types.ts", "end-to-end-workflow-result-review-summary.ts", "index.ts") `
  -Components @("EndToEndWorkflowResultReviewPanel.tsx", "index.ts") `
  -Exports @("buildEndToEndWorkflowResultReviewStableKey", "buildEndToEndWorkflowResultReview", "buildEndToEndWorkflowResultReviews", "buildEndToEndWorkflowResultReviewBoundary", "buildEndToEndWorkflowResultReviewModel", "summarizeEndToEndWorkflowResultReview", "END_TO_END_WORKFLOW_RESULT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("End-to-end workflow result review", "End-to-end workflow result review does not store live outputs", "End-to-end results require operator review before use", "Unsafe end-to-end results remain blocked", "Result groups", "Acceptance checklist") `
  -PlainEnglish @("End-to-end workflow result identity", "Rejection checklist", "Reuse checklist", "Safety review checklist", "Denied result actions", "Unresolved result blockers", "End-to-end recovery review route", "End-to-end hardening route", "next recommended action") `
  -RouteHref "/end-to-end-workflow-result-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 550 end-to-end workflow result review smoke passed."
