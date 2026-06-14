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
  -PhaseName "Phase 537 Automation Execution Boundary Readiness Review" `
  -ScriptFile "smoke-codexforge-automation-execution-boundary-readiness-review.ps1" `
  -Domain "src\lib\codexforge\automation-execution-boundary-readiness-review" `
  -Route "src\app\automation-execution-boundary-readiness-review" `
  -MainPanel "AutomationExecutionBoundaryReadinessReviewPanel" `
  -CommandLabel "Go to Automation Execution Boundary Readiness Review" `
  -Modules @("automation-execution-boundary-readiness-review-types.ts", "automation-execution-boundary-readiness-review-summary.ts", "index.ts") `
  -Components @("AutomationExecutionBoundaryReadinessReviewPanel.tsx", "index.ts") `
  -Exports @("buildAutomationExecutionBoundaryReadinessReviewStableKey", "buildAutomationExecutionBoundaryReadinessReview", "buildAutomationExecutionBoundaryReadinessReviews", "buildAutomationExecutionBoundaryReadinessReviewBoundary", "buildAutomationExecutionBoundaryReadinessReviewModel", "summarizeAutomationExecutionBoundaryReadinessReview", "AUTOMATION_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Automation execution boundary readiness review", "Automation execution boundary readiness review does not create or run automations", "Automation execution requires explicit operator approval", "Unresolved automation boundary blockers stay blocked", "Automation boundary groups", "Schedule watch checklist") `
  -PlainEnglish @("Automation execution boundary identity", "Approval gate checklist", "Notification checklist", "Stop/rollback checklist", "Denied automation execution actions", "Unresolved automation boundary blockers", "Backend boundary inventory route", "Daily Beta 1 release candidate route", "next recommended action") `
  -RouteHref "/automation-execution-boundary-readiness-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 537 automation execution boundary readiness review smoke passed."
