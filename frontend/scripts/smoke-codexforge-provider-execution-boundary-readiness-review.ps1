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
  -PhaseName "Phase 534 Provider Execution Boundary Readiness Review" `
  -ScriptFile "smoke-codexforge-provider-execution-boundary-readiness-review.ps1" `
  -Domain "src\lib\codexforge\provider-execution-boundary-readiness-review" `
  -Route "src\app\provider-execution-boundary-readiness-review" `
  -MainPanel "ProviderExecutionBoundaryReadinessReviewPanel" `
  -CommandLabel "Go to Provider Execution Boundary Readiness Review" `
  -Modules @("provider-execution-boundary-readiness-review-types.ts", "provider-execution-boundary-readiness-review-summary.ts", "index.ts") `
  -Components @("ProviderExecutionBoundaryReadinessReviewPanel.tsx", "index.ts") `
  -Exports @("buildProviderExecutionBoundaryReadinessReviewStableKey", "buildProviderExecutionBoundaryReadinessReview", "buildProviderExecutionBoundaryReadinessReviews", "buildProviderExecutionBoundaryReadinessReviewBoundary", "buildProviderExecutionBoundaryReadinessReviewModel", "summarizeProviderExecutionBoundaryReadinessReview", "PROVIDER_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Provider execution boundary readiness review", "Provider execution boundary readiness review does not call providers", "Provider execution requires explicit operator approval", "Unresolved provider boundary blockers stay blocked", "Provider boundary groups", "Budget rate-limit checklist") `
  -PlainEnglish @("Provider execution boundary identity", "Approval gate checklist", "Prompt/privacy checklist", "Result/evidence checklist", "Denied provider execution actions", "Unresolved provider boundary blockers", "Local model execution readiness route", "Connector execution readiness route", "next recommended action") `
  -RouteHref "/provider-execution-boundary-readiness-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 534 provider execution boundary readiness review smoke passed."
