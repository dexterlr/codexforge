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
  -PhaseName "Phase 586 Daily Beta 1 Activation Final Gate" `
  -ScriptFile "smoke-codexforge-daily-beta-1-activation-final-gate.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-activation-final-gate" `
  -Route "src\app\daily-beta-1-activation-final-gate" `
  -MainPanel "DailyBetaOneActivationFinalGatePanel" `
  -CommandLabel "Go to Daily Beta 1 Activation Final Gate" `
  -Modules @("daily-beta-1-activation-final-gate-types.ts", "daily-beta-1-activation-final-gate-summary.ts", "index.ts") `
  -Components @("DailyBetaOneActivationFinalGatePanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneActivationFinalGateStableKey", "buildDailyBetaOneActivationFinalGate", "buildDailyBetaOneActivationFinalGates", "buildDailyBetaOneActivationFinalGateBoundary", "buildDailyBetaOneActivationFinalGateModel", "summarizeDailyBetaOneActivationFinalGate", "DAILY_BETA_ONE_ACTIVATION_FINAL_GATE_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 activation final gate", "Daily Beta 1 activation final gate does not activate Daily Beta 1", "Daily Beta 1 final gate decisions require explicit operator approval", "Unresolved Daily Beta 1 final gate blockers stay blocked", "Final gate groups", "Activation candidate status") `
  -PlainEnglish @("Daily Beta 1 activation final gate identity", "Final operator/regression/recovery/hardening status", "Live boundary status", "Release handoff status", "Denied final gate actions", "Unresolved final gate blockers", "Controlled trial route", "Feedback review route", "Next recommended action", "no final gate auto-pass", "no Daily Beta 1 activation execution", "no controlled trial execution", "no workflow execution", "no go-live behavior", "no release candidate signoff automation", "no readiness lock automation", "no recovery trigger", "no hardening apply behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-1-activation-final-gate" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 586 Daily Beta 1 activation final gate smoke passed."
