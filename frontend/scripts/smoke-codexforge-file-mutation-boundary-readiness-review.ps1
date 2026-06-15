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
  -PhaseName "Phase 538 File Mutation Boundary Readiness Review" `
  -ScriptFile "smoke-codexforge-file-mutation-boundary-readiness-review.ps1" `
  -Domain "src\lib\codexforge\file-mutation-boundary-readiness-review" `
  -Route "src\app\file-mutation-boundary-readiness-review" `
  -MainPanel "FileMutationBoundaryReadinessReviewPanel" `
  -CommandLabel "Go to File Mutation Boundary Readiness Review" `
  -Modules @("file-mutation-boundary-readiness-review-types.ts", "file-mutation-boundary-readiness-review-summary.ts", "index.ts") `
  -Components @("FileMutationBoundaryReadinessReviewPanel.tsx", "index.ts") `
  -Exports @("buildFileMutationBoundaryReadinessReviewStableKey", "buildFileMutationBoundaryReadinessReview", "buildFileMutationBoundaryReadinessReviews", "buildFileMutationBoundaryReadinessReviewBoundary", "buildFileMutationBoundaryReadinessReviewModel", "summarizeFileMutationBoundaryReadinessReview", "FILE_MUTATION_BOUNDARY_READINESS_REVIEW_LANGUAGE") `
  -PhaseMarkers @("File mutation boundary readiness review", "File mutation boundary readiness review does not mutate files", "File mutation requires explicit operator approval", "Unresolved file mutation blockers stay blocked", "Mutation boundary groups", "Approved root checklist") `
  -PlainEnglish @("File mutation boundary identity", "Diff/patch checklist", "Rollback checklist", "Audit/evidence checklist", "Denied file mutation actions", "Unresolved file mutation blockers", "Test execution boundary route", "Unified execution gap report route", "next recommended action") `
  -RouteHref "/file-mutation-boundary-readiness-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 538 file mutation boundary readiness review smoke passed."
