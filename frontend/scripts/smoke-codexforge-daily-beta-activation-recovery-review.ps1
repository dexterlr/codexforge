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
  -PhaseName "Phase 566 Daily Beta Activation Recovery Review" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-recovery-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-activation-recovery-review" `
  -Route "src\app\daily-beta-activation-recovery-review" `
  -MainPanel "DailyBetaActivationRecoveryReviewPanel" `
  -CommandLabel "Go to Daily Beta Activation Recovery Review" `
  -Modules @("daily-beta-activation-recovery-review-types.ts", "daily-beta-activation-recovery-review-summary.ts", "index.ts") `
  -Components @("DailyBetaActivationRecoveryReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaActivationRecoveryReviewStableKey", "buildDailyBetaActivationRecoveryReview", "buildDailyBetaActivationRecoveryReviews", "buildDailyBetaActivationRecoveryReviewBoundary", "buildDailyBetaActivationRecoveryReviewModel", "summarizeDailyBetaActivationRecoveryReview", "DAILY_BETA_ACTIVATION_RECOVERY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta activation recovery review", "Daily Beta activation recovery review does not trigger recovery", "Recovery actions require explicit operator approval", "Unsafe activation recovery shortcuts stay blocked", "Recovery groups", "Activation failure categories") `
  -PlainEnglish @("Activation recovery identity", "Rollback checklist", "Escalation checklist", "Operator decision checklist", "Denied recovery actions", "Unresolved recovery blockers", "Activation hardening route", "Activation release candidate route", "Next recommended action", "no activation execution", "no activation dry-run execution", "no Daily Beta activation from UI", "no recovery trigger", "no hardening apply behavior", "no release candidate signoff automation", "no operator readiness signoff automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-activation-recovery-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 566 Daily Beta activation recovery review smoke passed."
