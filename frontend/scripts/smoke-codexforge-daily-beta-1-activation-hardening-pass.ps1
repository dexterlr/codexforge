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
  -PhaseName "Phase 591 Daily Beta 1 Activation Hardening Pass" `
  -ScriptFile "smoke-codexforge-daily-beta-1-activation-hardening-pass.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-activation-hardening-pass" `
  -Route "src\app\daily-beta-1-activation-hardening-pass" `
  -MainPanel "DailyBetaOneActivationHardeningPassPanel" `
  -CommandLabel "Go to Daily Beta 1 Activation Hardening Pass" `
  -Modules @("daily-beta-1-activation-hardening-pass-types.ts", "daily-beta-1-activation-hardening-pass-summary.ts", "index.ts") `
  -Components @("DailyBetaOneActivationHardeningPassPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneActivationHardeningPassStableKey", "buildDailyBetaOneActivationHardeningPass", "buildDailyBetaOneActivationHardeningPasses", "buildDailyBetaOneActivationHardeningPassBoundary", "buildDailyBetaOneActivationHardeningPassModel", "summarizeDailyBetaOneActivationHardeningPass", "DAILY_BETA_ONE_ACTIVATION_HARDENING_PASS_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 activation hardening pass", "Daily Beta 1 activation hardening pass does not apply changes", "Daily Beta 1 activation hardening changes require explicit operator approval", "Unresolved Daily Beta 1 activation hardening blockers stay blocked", "Hardening groups", "Live boundary status") `
  -PlainEnglish @("Daily Beta 1 activation hardening identity", "Final gate status", "Controlled trial status", "Feedback/regression/recovery status", "Denied hardening actions", "Unresolved hardening blockers", "Activation release candidate route", "Readiness lock route", "Next recommended action", "no hardening apply behavior", "no file mutation", "no memory/RAG ingestion", "no workflow execution", "no recovery trigger", "no readiness lock automation", "no Daily Beta 1 activation execution", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-1-activation-hardening-pass" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 591 Daily Beta 1 activation hardening pass smoke passed."
