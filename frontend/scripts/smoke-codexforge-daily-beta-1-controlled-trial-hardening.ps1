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
  -PhaseName "Phase 532 Daily Beta 1 Controlled Trial Hardening" `
  -ScriptFile "smoke-codexforge-daily-beta-1-controlled-trial-hardening.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-controlled-trial-hardening" `
  -Route "src\app\daily-beta-1-controlled-trial-hardening" `
  -MainPanel "DailyBetaOneControlledTrialHardeningPanel" `
  -CommandLabel "Go to Daily Beta 1 Controlled Trial Hardening" `
  -Modules @("daily-beta-1-controlled-trial-hardening-types.ts", "daily-beta-1-controlled-trial-hardening-summary.ts", "index.ts") `
  -Components @("DailyBetaOneControlledTrialHardeningPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneControlledTrialHardeningStableKey", "buildDailyBetaOneControlledTrialHardening", "buildDailyBetaOneControlledTrialHardeningReviews", "buildDailyBetaOneControlledTrialHardeningBoundary", "buildDailyBetaOneControlledTrialHardeningModel", "summarizeDailyBetaOneControlledTrialHardening", "DAILY_BETA_ONE_CONTROLLED_TRIAL_HARDENING_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 controlled trial hardening", "Daily Beta 1 controlled trial hardening does not apply changes", "Controlled trial hardening changes require explicit operator approval", "Unresolved controlled trial hardening blockers stay blocked", "Hardening groups", "Boundary readiness checklist") `
  -PlainEnglish @("Controlled trial hardening identity", "Result review status", "Recovery review status", "Release candidate readiness checklist", "Denied hardening actions", "Unresolved hardening blockers", "Backend boundary inventory route", "Provider execution boundary route", "next recommended action") `
  -RouteHref "/daily-beta-1-controlled-trial-hardening" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 532 Daily Beta 1 controlled trial hardening smoke passed."
