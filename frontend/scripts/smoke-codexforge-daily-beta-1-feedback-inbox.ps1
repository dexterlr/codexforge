param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\daily-beta-1-feedback-inbox"
$route = "src\app\daily-beta-1-feedback-inbox"
$phaseMarkers = @(
  "Daily Beta 1 feedback inbox",
  "Daily Beta 1 feedback inbox does not auto-ingest feedback",
  "Daily Beta 1 feedback requires operator review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Feedback groups",
  "Safety feedback lane"
)
$plainEnglish = @(
  "Daily Beta 1 feedback inbox identity",
  "Usability feedback lane",
  "Rollout feedback lane",
  "Release feedback lane",
  "Denied feedback actions",
  "Unresolved feedback blockers",
  "Daily Beta hardening route",
  "Daily Beta 1 candidate route",
  "next recommended action",
  "no feedback auto-ingestion",
  "advanced feedback inbox details collapsed/secondary"
)
$newRoutes = @(
  "/multi-workflow-operator-trial-plan",
  "/multi-workflow-trial-review",
  "/multi-workflow-regression-review",
  "/multi-workflow-release-candidate",
  "/controlled-live-capability-signoff",
  "/codexforge-daily-beta-release-candidate",
  "/daily-beta-controlled-operator-trial",
  "/daily-beta-feedback-review",
  "/daily-beta-hardening-pass",
  "/daily-beta-documentation-final-review",
  "/daily-beta-onboarding-final-review",
  "/daily-beta-release-signoff-review",
  "/codexforge-daily-beta-1-candidate",
  "/daily-beta-1-controlled-rollout-plan",
  "/daily-beta-1-rollout-review",
  "/daily-beta-1-feedback-inbox"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 521 Daily Beta 1 Feedback Inbox" `
  -ScriptFile "smoke-codexforge-daily-beta-1-feedback-inbox.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "DailyBetaOneFeedbackInboxPanel" `
  -CommandLabel "Go to Daily Beta 1 Feedback Inbox" `
  -Modules @("daily-beta-1-feedback-inbox-types.ts","daily-beta-1-feedback-inbox-summary.ts","index.ts") `
  -Components @("DailyBetaOneFeedbackInboxPanel.tsx","index.ts") `
  -Exports @("buildDailyBetaOneFeedbackInboxStableKey","buildDailyBetaOneFeedbackInbox","buildDailyBetaOneFeedbackInboxes","buildDailyBetaOneFeedbackInboxBoundary","buildDailyBetaOneFeedbackInboxModel","summarizeDailyBetaOneFeedbackInbox","DAILY_BETA_ONE_FEEDBACK_INBOX_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/daily-beta-1-rollout-review","/daily-beta-hardening-pass","/codexforge-daily-beta-1-candidate","/daily-beta-1-controlled-rollout-plan") `
  -ProtectedRoutes $newRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Daily Beta 1 Feedback Inbox smoke passed."
