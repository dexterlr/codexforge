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
  "/automation-execution-boundary-readiness-review"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 535 Local Model Execution Boundary Readiness Review" `
  -ScriptFile "smoke-codexforge-local-model-execution-boundary-readiness-review.ps1" `
  -Domain "src\lib\codexforge\local-model-execution-boundary-readiness-review" `
  -Route "src\app\local-model-execution-boundary-readiness-review" `
  -MainPanel "LocalModelExecutionBoundaryReadinessReviewPanel" `
  -CommandLabel "Go to Local Model Execution Boundary Readiness Review" `
  -Modules @("local-model-execution-boundary-readiness-review-types.ts", "local-model-execution-boundary-readiness-review-summary.ts", "index.ts") `
  -Components @("LocalModelExecutionBoundaryReadinessReviewPanel.tsx", "index.ts") `
  -Exports @("buildLocalModelExecutionBoundaryReadinessReviewStableKey", "buildLocalModelExecutionBoundaryReadinessReview", "buildLocalModelExecutionBoundaryReadinessReviews", "buildLocalModelExecutionBoundaryReadinessReviewBoundary", "buildLocalModelExecutionBoundaryReadinessReviewModel", "summarizeLocalModelExecutionBoundaryReadinessReview", "LOCAL_MODEL_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Local model execution boundary readiness review", "Local model execution boundary readiness review does not call local models", "Local model execution requires explicit operator approval", "Unresolved local model boundary blockers stay blocked", "Local model boundary groups", "Local bridge checklist") `
  -PlainEnglish @("Local model execution boundary identity", "Approval gate checklist", "Prompt/privacy checklist", "Result/evidence checklist", "Denied local model execution actions", "Unresolved local model boundary blockers", "Connector execution readiness route", "Automation execution readiness route", "next recommended action") `
  -RouteHref "/local-model-execution-boundary-readiness-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 535 local model execution boundary readiness review smoke passed."
