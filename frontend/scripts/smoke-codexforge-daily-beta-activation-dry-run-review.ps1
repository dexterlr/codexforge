param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/codexforge-end-to-end-workflow-release-candidate",
  "/end-to-end-controlled-rollout-plan",
  "/end-to-end-controlled-rollout-review",
  "/end-to-end-rollout-feedback-inbox",
  "/end-to-end-rollout-regression-review",
  "/end-to-end-rollout-hardening-pass",
  "/live-execution-boundary-final-signoff",
  "/codexforge-end-to-end-daily-beta-candidate",
  "/end-to-end-daily-beta-operator-handoff",
  "/daily-beta-activation-checklist-review",
  "/daily-beta-activation-dry-run-review",
  "/daily-beta-activation-evidence-review",
  "/daily-beta-activation-result-review",
  "/daily-beta-activation-recovery-review",
  "/daily-beta-activation-hardening-pass",
  "/codexforge-daily-beta-activation-release-candidate",
  "/daily-beta-activation-operator-readiness-review"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 563 Daily Beta Activation Dry-Run Review" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-dry-run-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-activation-dry-run-review" `
  -Route "src\app\daily-beta-activation-dry-run-review" `
  -MainPanel "DailyBetaActivationDryRunReviewPanel" `
  -CommandLabel "Go to Daily Beta Activation Dry-Run Review" `
  -Modules @("daily-beta-activation-dry-run-review-types.ts", "daily-beta-activation-dry-run-review-summary.ts", "index.ts") `
  -Components @("DailyBetaActivationDryRunReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaActivationDryRunReviewStableKey", "buildDailyBetaActivationDryRunReview", "buildDailyBetaActivationDryRunReviews", "buildDailyBetaActivationDryRunReviewBoundary", "buildDailyBetaActivationDryRunReviewModel", "summarizeDailyBetaActivationDryRunReview", "DAILY_BETA_ACTIVATION_DRY_RUN_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta activation dry-run review", "Daily Beta activation dry-run review does not run activation dry-runs", "Activation dry-runs require explicit operator approval", "Unapproved activation dry-run paths remain blocked", "Dry-run groups", "Rollback checklist") `
  -PlainEnglish @("Activation dry-run identity", "Boundary dry-run checklist", "Rollout dry-run checklist", "Operator decision checklist", "Denied dry-run actions", "Unresolved dry-run blockers", "Activation evidence review route", "Activation result review route", "Next recommended action", "no activation execution", "no activation dry-run execution", "no Daily Beta activation from UI", "no recovery trigger", "no hardening apply behavior", "no release candidate signoff automation", "no operator readiness signoff automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-activation-dry-run-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 563 Daily Beta activation dry-run review smoke passed."
