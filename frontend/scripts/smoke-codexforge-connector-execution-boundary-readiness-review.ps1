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
  -PhaseName "Phase 536 Connector Execution Boundary Readiness Review" `
  -ScriptFile "smoke-codexforge-connector-execution-boundary-readiness-review.ps1" `
  -Domain "src\lib\codexforge\connector-execution-boundary-readiness-review" `
  -Route "src\app\connector-execution-boundary-readiness-review" `
  -MainPanel "ConnectorExecutionBoundaryReadinessReviewPanel" `
  -CommandLabel "Go to Connector Execution Boundary Readiness Review" `
  -Modules @("connector-execution-boundary-readiness-review-types.ts", "connector-execution-boundary-readiness-review-summary.ts", "index.ts") `
  -Components @("ConnectorExecutionBoundaryReadinessReviewPanel.tsx", "index.ts") `
  -Exports @("buildConnectorExecutionBoundaryReadinessReviewStableKey", "buildConnectorExecutionBoundaryReadinessReview", "buildConnectorExecutionBoundaryReadinessReviews", "buildConnectorExecutionBoundaryReadinessReviewBoundary", "buildConnectorExecutionBoundaryReadinessReviewModel", "summarizeConnectorExecutionBoundaryReadinessReview", "CONNECTOR_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Connector execution boundary readiness review", "Connector execution boundary readiness review does not call connectors", "Connector execution requires explicit operator approval", "Unresolved connector boundary blockers stay blocked", "Connector boundary groups", "Source redaction checklist") `
  -PlainEnglish @("Connector execution boundary identity", "Account/permission checklist", "Evidence/citation checklist", "Rollback/revocation checklist", "Denied connector execution actions", "Unresolved connector boundary blockers", "Automation execution readiness route", "Backend boundary inventory route", "next recommended action") `
  -RouteHref "/connector-execution-boundary-readiness-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 536 connector execution boundary readiness review smoke passed."
