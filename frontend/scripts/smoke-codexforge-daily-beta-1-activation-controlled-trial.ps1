param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/daily-beta-readiness-lock-audit",
  "/daily-beta-release-candidate-summary",
  "/codexforge-daily-beta-1-final-candidate",
  "/daily-beta-1-final-operator-review",
  "/daily-beta-1-final-regression-review",
  "/daily-beta-1-final-recovery-review",
  "/daily-beta-1-final-hardening-pass",
  "/codexforge-daily-beta-1-activation-candidate",
  "/daily-beta-1-activation-final-gate",
  "/daily-beta-1-activation-controlled-trial",
  "/daily-beta-1-activation-feedback-review",
  "/daily-beta-1-activation-regression-review",
  "/daily-beta-1-activation-recovery-review",
  "/daily-beta-1-activation-hardening-pass",
  "/codexforge-daily-beta-1-activation-release-candidate",
  "/daily-beta-1-activation-readiness-lock"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 587 Daily Beta 1 Activation Controlled Trial" `
  -ScriptFile "smoke-codexforge-daily-beta-1-activation-controlled-trial.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-activation-controlled-trial" `
  -Route "src\app\daily-beta-1-activation-controlled-trial" `
  -MainPanel "DailyBetaOneActivationControlledTrialPanel" `
  -CommandLabel "Go to Daily Beta 1 Activation Controlled Trial" `
  -Modules @("daily-beta-1-activation-controlled-trial-types.ts", "daily-beta-1-activation-controlled-trial-summary.ts", "index.ts") `
  -Components @("DailyBetaOneActivationControlledTrialPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneActivationControlledTrialStableKey", "buildDailyBetaOneActivationControlledTrial", "buildDailyBetaOneActivationControlledTrials", "buildDailyBetaOneActivationControlledTrialBoundary", "buildDailyBetaOneActivationControlledTrialModel", "summarizeDailyBetaOneActivationControlledTrial", "DAILY_BETA_ONE_ACTIVATION_CONTROLLED_TRIAL_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 activation controlled trial", "Daily Beta 1 activation controlled trial does not execute workflows", "Daily Beta 1 controlled trial actions require explicit operator approval", "Unapproved Daily Beta 1 controlled trial paths remain blocked", "Controlled trial groups", "Operator task checklist") `
  -PlainEnglish @("Daily Beta 1 controlled trial identity", "Approval gate checklist", "Evidence/result/recovery checklist", "Live boundary checklist", "Denied controlled trial actions", "Unresolved controlled trial blockers", "Feedback review route", "Regression review route", "Next recommended action", "no controlled trial execution", "no workflow execution", "no provider API calls", "no local model calls", "no connector API calls", "no automation creation", "no Daily Beta 1 activation execution", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-1-activation-controlled-trial" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 587 Daily Beta 1 activation controlled trial smoke passed."
