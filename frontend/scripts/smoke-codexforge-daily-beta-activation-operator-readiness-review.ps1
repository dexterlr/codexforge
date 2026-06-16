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
  -PhaseName "Phase 569 Daily Beta Activation Operator Readiness Review" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-operator-readiness-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-activation-operator-readiness-review" `
  -Route "src\app\daily-beta-activation-operator-readiness-review" `
  -MainPanel "DailyBetaActivationOperatorReadinessReviewPanel" `
  -CommandLabel "Go to Daily Beta Activation Operator Readiness Review" `
  -Modules @("daily-beta-activation-operator-readiness-review-types.ts", "daily-beta-activation-operator-readiness-review-summary.ts", "index.ts") `
  -Components @("DailyBetaActivationOperatorReadinessReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaActivationOperatorReadinessReviewStableKey", "buildDailyBetaActivationOperatorReadinessReview", "buildDailyBetaActivationOperatorReadinessReviews", "buildDailyBetaActivationOperatorReadinessReviewBoundary", "buildDailyBetaActivationOperatorReadinessReviewModel", "summarizeDailyBetaActivationOperatorReadinessReview", "DAILY_BETA_ACTIVATION_OPERATOR_READINESS_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta activation operator readiness review", "Daily Beta activation operator readiness review does not activate Daily Beta", "Operator readiness signoff requires explicit operator approval", "Unresolved operator readiness blockers stay blocked", "Readiness groups", "Support rollback checklist") `
  -PlainEnglish @("Activation operator readiness identity", "Operator checklist", "Approval boundary checklist", "Handoff checklist", "Denied readiness actions", "Unresolved readiness blockers", "Activation release candidate route", "Checkpoint docs route", "Next recommended action", "no activation execution", "no activation dry-run execution", "no Daily Beta activation from UI", "no recovery trigger", "no hardening apply behavior", "no release candidate signoff automation", "no operator readiness signoff automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-activation-operator-readiness-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 569 Daily Beta activation operator readiness review smoke passed."
