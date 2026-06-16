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
  -PhaseName "Phase 562 Daily Beta Activation Checklist Review" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-checklist-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-activation-checklist-review" `
  -Route "src\app\daily-beta-activation-checklist-review" `
  -MainPanel "DailyBetaActivationChecklistReviewPanel" `
  -CommandLabel "Go to Daily Beta Activation Checklist Review" `
  -Modules @("daily-beta-activation-checklist-review-types.ts", "daily-beta-activation-checklist-review-summary.ts", "index.ts") `
  -Components @("DailyBetaActivationChecklistReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaActivationChecklistReviewStableKey", "buildDailyBetaActivationChecklistReview", "buildDailyBetaActivationChecklistReviews", "buildDailyBetaActivationChecklistReviewBoundary", "buildDailyBetaActivationChecklistReviewModel", "summarizeDailyBetaActivationChecklistReview", "DAILY_BETA_ACTIVATION_CHECKLIST_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta activation checklist review", "Daily Beta activation checklist review does not activate Daily Beta", "Activation requires explicit operator approval", "Unresolved activation blockers stay blocked", "Activation checklist groups", "Live boundary readiness checklist") `
  -PlainEnglish @("Activation checklist identity", "Rollout readiness checklist", "Operator readiness checklist", "Evidence/result/recovery readiness checklist", "Denied activation actions", "Unresolved activation blockers", "Activation dry-run route", "Activation evidence review route", "Next recommended action", "no activation execution", "no activation dry-run execution", "no Daily Beta activation from UI", "no recovery trigger", "no hardening apply behavior", "no release candidate signoff automation", "no operator readiness signoff automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-activation-checklist-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 562 Daily Beta activation checklist review smoke passed."
