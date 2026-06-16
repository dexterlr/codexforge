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
  "/end-to-end-daily-beta-operator-handoff"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 556 End-to-End Rollout Feedback Inbox" `
  -ScriptFile "smoke-codexforge-end-to-end-rollout-feedback-inbox.ps1" `
  -Domain "src\lib\codexforge\end-to-end-rollout-feedback-inbox" `
  -Route "src\app\end-to-end-rollout-feedback-inbox" `
  -MainPanel "EndToEndRolloutFeedbackInboxPanel" `
  -CommandLabel "Go to End-to-End Rollout Feedback Inbox" `
  -Modules @("end-to-end-rollout-feedback-inbox-types.ts", "end-to-end-rollout-feedback-inbox-summary.ts", "index.ts") `
  -Components @("EndToEndRolloutFeedbackInboxPanel.tsx", "index.ts") `
  -Exports @("buildEndToEndRolloutFeedbackInboxStableKey", "buildEndToEndRolloutFeedbackInbox", "buildEndToEndRolloutFeedbackInboxes", "buildEndToEndRolloutFeedbackInboxBoundary", "buildEndToEndRolloutFeedbackInboxModel", "summarizeEndToEndRolloutFeedbackInbox", "END_TO_END_ROLLOUT_FEEDBACK_INBOX_LANGUAGE") `
  -PhaseMarkers @("End-to-end rollout feedback inbox", "End-to-end rollout feedback inbox does not auto-ingest feedback", "Rollout feedback requires operator review before use", "Unsafe rollout feedback shortcuts stay blocked", "Feedback groups", "Safety feedback lane") `
  -PlainEnglish @("Rollout feedback inbox identity", "Usability feedback lane", "Rollout feedback lane", "Release feedback lane", "Denied feedback actions", "Unresolved feedback blockers", "Rollout regression route", "Rollout hardening route", "next recommended action", "no feedback auto-ingestion", "no memory/RAG ingestion", "no Brain graph mutation") `
  -RouteHref "/end-to-end-rollout-feedback-inbox" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 556 end-to-end rollout feedback inbox smoke passed."
