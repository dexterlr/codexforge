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
  -PhaseName "Phase 549 End-to-End Workflow Evidence Review" `
  -ScriptFile "smoke-codexforge-end-to-end-workflow-evidence-review.ps1" `
  -Domain "src\lib\codexforge\end-to-end-workflow-evidence-review" `
  -Route "src\app\end-to-end-workflow-evidence-review" `
  -MainPanel "EndToEndWorkflowEvidenceReviewPanel" `
  -CommandLabel "Go to End-to-End Workflow Evidence Review" `
  -Modules @("end-to-end-workflow-evidence-review-types.ts", "end-to-end-workflow-evidence-review-summary.ts", "index.ts") `
  -Components @("EndToEndWorkflowEvidenceReviewPanel.tsx", "index.ts") `
  -Exports @("buildEndToEndWorkflowEvidenceReviewStableKey", "buildEndToEndWorkflowEvidenceReview", "buildEndToEndWorkflowEvidenceReviews", "buildEndToEndWorkflowEvidenceReviewBoundary", "buildEndToEndWorkflowEvidenceReviewModel", "summarizeEndToEndWorkflowEvidenceReview", "END_TO_END_WORKFLOW_EVIDENCE_REVIEW_LANGUAGE") `
  -PhaseMarkers @("End-to-end workflow evidence review", "End-to-end workflow evidence review does not ingest evidence automatically", "Evidence requires operator review before use", "Private end-to-end evidence stays redacted", "Evidence groups", "Provider local connector file test evidence checklist") `
  -PlainEnglish @("End-to-end workflow evidence identity", "Citation/source checklist", "Redaction/privacy checklist", "Operator approval checklist", "Denied evidence actions", "Unresolved evidence blockers", "End-to-end result review route", "End-to-end recovery review route", "next recommended action") `
  -RouteHref "/end-to-end-workflow-evidence-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 549 end-to-end workflow evidence review smoke passed."
