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
  "/daily-beta-activation-operator-readiness-review",
  "/daily-beta-activation-final-gate",
  "/daily-beta-activation-controlled-operator-trial",
  "/daily-beta-activation-feedback-inbox",
  "/daily-beta-activation-regression-review",
  "/daily-beta-activation-final-hardening",
  "/codexforge-daily-beta-activation-candidate",
  "/daily-beta-activation-release-handoff",
  "/daily-beta-activation-readiness-lock"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 572 Daily Beta Activation Feedback Inbox" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-feedback-inbox.ps1" `
  -Domain "src\lib\codexforge\daily-beta-activation-feedback-inbox" `
  -Route "src\app\daily-beta-activation-feedback-inbox" `
  -MainPanel "DailyBetaActivationFeedbackInboxPanel" `
  -CommandLabel "Go to Daily Beta Activation Feedback Inbox" `
  -Modules @("daily-beta-activation-feedback-inbox-types.ts", "daily-beta-activation-feedback-inbox-summary.ts", "index.ts") `
  -Components @("DailyBetaActivationFeedbackInboxPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaActivationFeedbackInboxStableKey", "buildDailyBetaActivationFeedbackInbox", "buildDailyBetaActivationFeedbackInboxes", "buildDailyBetaActivationFeedbackInboxBoundary", "buildDailyBetaActivationFeedbackInboxModel", "summarizeDailyBetaActivationFeedbackInbox", "DAILY_BETA_ACTIVATION_FEEDBACK_INBOX_LANGUAGE") `
  -PhaseMarkers @("Daily Beta activation feedback inbox", "Daily Beta activation feedback inbox does not auto-ingest feedback", "Activation feedback requires operator review before use", "Unsafe feedback shortcuts stay blocked", "Feedback groups", "Safety feedback lane") `
  -PlainEnglish @("Activation feedback inbox identity", "Usability feedback lane", "Activation feedback lane", "Release feedback lane", "Denied feedback actions", "Unresolved feedback blockers", "Regression review route", "Final hardening route", "Next recommended action", "no feedback auto-ingestion", "no memory/RAG ingestion", "no Brain graph mutation", "no file write", "no final gate auto-pass", "no controlled operator trial execution", "no release handoff send behavior", "no readiness lock automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-activation-feedback-inbox" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 572 Daily Beta activation feedback inbox smoke passed."
