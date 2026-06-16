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
  -PhaseName "Phase 564 Daily Beta Activation Evidence Review" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-evidence-review.ps1" `
  -Domain "src\lib\codexforge\daily-beta-activation-evidence-review" `
  -Route "src\app\daily-beta-activation-evidence-review" `
  -MainPanel "DailyBetaActivationEvidenceReviewPanel" `
  -CommandLabel "Go to Daily Beta Activation Evidence Review" `
  -Modules @("daily-beta-activation-evidence-review-types.ts", "daily-beta-activation-evidence-review-summary.ts", "index.ts") `
  -Components @("DailyBetaActivationEvidenceReviewPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaActivationEvidenceReviewStableKey", "buildDailyBetaActivationEvidenceReview", "buildDailyBetaActivationEvidenceReviews", "buildDailyBetaActivationEvidenceReviewBoundary", "buildDailyBetaActivationEvidenceReviewModel", "summarizeDailyBetaActivationEvidenceReview", "DAILY_BETA_ACTIVATION_EVIDENCE_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Daily Beta activation evidence review", "Daily Beta activation evidence review does not ingest evidence automatically", "Activation evidence requires operator review before use", "Private activation evidence stays redacted", "Evidence groups", "Citation source checklist") `
  -PlainEnglish @("Activation evidence identity", "Live boundary evidence checklist", "Rollout evidence checklist", "Redaction/privacy checklist", "Denied evidence actions", "Unresolved evidence blockers", "Activation result review route", "Activation recovery review route", "Next recommended action", "no activation execution", "no activation dry-run execution", "no Daily Beta activation from UI", "no recovery trigger", "no hardening apply behavior", "no release candidate signoff automation", "no operator readiness signoff automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-activation-evidence-review" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 564 Daily Beta activation evidence review smoke passed."
