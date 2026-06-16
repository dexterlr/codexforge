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
  -PhaseName "Phase 561 End-to-End Daily Beta Operator Handoff" `
  -ScriptFile "smoke-codexforge-end-to-end-daily-beta-operator-handoff.ps1" `
  -Domain "src\lib\codexforge\end-to-end-daily-beta-operator-handoff" `
  -Route "src\app\end-to-end-daily-beta-operator-handoff" `
  -MainPanel "EndToEndDailyBetaOperatorHandoffPanel" `
  -CommandLabel "Go to End-to-End Daily Beta Operator Handoff" `
  -Modules @("end-to-end-daily-beta-operator-handoff-types.ts", "end-to-end-daily-beta-operator-handoff-summary.ts", "index.ts") `
  -Components @("EndToEndDailyBetaOperatorHandoffPanel.tsx", "index.ts") `
  -Exports @("buildEndToEndDailyBetaOperatorHandoffStableKey", "buildEndToEndDailyBetaOperatorHandoff", "buildEndToEndDailyBetaOperatorHandoffs", "buildEndToEndDailyBetaOperatorHandoffBoundary", "buildEndToEndDailyBetaOperatorHandoffModel", "summarizeEndToEndDailyBetaOperatorHandoff", "END_TO_END_DAILY_BETA_OPERATOR_HANDOFF_LANGUAGE") `
  -PhaseMarkers @("End-to-end Daily Beta operator handoff", "End-to-end Daily Beta operator handoff does not send or apply handoff automatically", "Operator handoff requires explicit operator approval", "Unresolved handoff blockers stay blocked", "Handoff groups", "Live boundary limitation summary") `
  -PlainEnglish @("End-to-end Daily Beta operator handoff identity", "Operator runbook summary", "Approval boundary summary", "Rollout limitation summary", "Validation checklist", "Denied handoff actions", "Unresolved handoff blockers", "Daily Beta candidate route", "Release readiness dashboard route", "next recommended action", "no handoff send behavior", "no export/write behavior", "no memory auto-promotion") `
  -RouteHref "/end-to-end-daily-beta-operator-handoff" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 561 end-to-end Daily Beta operator handoff smoke passed."
