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
  "/first-approved-file-patch-dry-run"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 539 Test Execution Boundary Readiness Review" `
  -ScriptFile "smoke-codexforge-test-execution-boundary-readiness-review.ps1" `
  -Domain "src\lib\codexforge\test-execution-boundary-readiness-review" `
  -Route "src\app\test-execution-boundary-readiness-review" `
  -MainPanel "TestExecutionBoundaryReadinessReviewPanel" `
  -CommandLabel "Go to Test Execution Boundary Readiness Review" `
  -Modules @("test-execution-boundary-readiness-review-types.ts", "test-execution-boundary-readiness-review-summary.ts", "index.ts") `
  -Components @("TestExecutionBoundaryReadinessReviewPanel.tsx", "index.ts") `
  -Exports @("buildTestExecutionBoundaryReadinessReviewStableKey", "buildTestExecutionBoundaryReadinessReview", "buildTestExecutionBoundaryReadinessReviews", "buildTestExecutionBoundaryReadinessReviewBoundary", "buildTestExecutionBoundaryReadinessReviewModel", "summarizeTestExecutionBoundaryReadinessReview", "TEST_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Test execution boundary readiness review", "Test execution boundary readiness review does not run tests", "Test execution requires explicit operator approval", "Unresolved test execution blockers stay blocked", "Test boundary groups", "Allowed command checklist") `
  -PlainEnglish @("Test execution boundary identity", "Workspace scope checklist", "Timeout/logging checklist", "Rollback/retry checklist", "Denied test execution actions", "Unresolved test execution blockers", "Unified execution gap report route", "First provider execution trial route", "next recommended action") `
  -RouteHref "/test-execution-boundary-readiness-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 539 test execution boundary readiness review smoke passed."
