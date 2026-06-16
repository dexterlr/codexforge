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
  -PhaseName "Phase 567 Daily Beta Activation Hardening Pass" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-hardening-pass.ps1" `
  -Domain "src\lib\codexforge\daily-beta-activation-hardening-pass" `
  -Route "src\app\daily-beta-activation-hardening-pass" `
  -MainPanel "DailyBetaActivationHardeningPassPanel" `
  -CommandLabel "Go to Daily Beta Activation Hardening Pass" `
  -Modules @("daily-beta-activation-hardening-pass-types.ts", "daily-beta-activation-hardening-pass-summary.ts", "index.ts") `
  -Components @("DailyBetaActivationHardeningPassPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaActivationHardeningPassStableKey", "buildDailyBetaActivationHardeningPass", "buildDailyBetaActivationHardeningPasses", "buildDailyBetaActivationHardeningPassBoundary", "buildDailyBetaActivationHardeningPassModel", "summarizeDailyBetaActivationHardeningPass", "DAILY_BETA_ACTIVATION_HARDENING_PASS_LANGUAGE") `
  -PhaseMarkers @("Daily Beta activation hardening pass", "Daily Beta activation hardening pass does not apply changes", "Activation hardening changes require explicit operator approval", "Unresolved activation hardening blockers stay blocked", "Hardening groups", "Live boundary status") `
  -PlainEnglish @("Activation hardening identity", "Checklist/dry-run/evidence/result/recovery status", "Operator readiness checklist", "Denied hardening actions", "Unresolved activation hardening blockers", "Activation release candidate route", "Operator readiness review route", "Next recommended action", "no activation execution", "no activation dry-run execution", "no Daily Beta activation from UI", "no recovery trigger", "no hardening apply behavior", "no release candidate signoff automation", "no operator readiness signoff automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-activation-hardening-pass" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 567 Daily Beta activation hardening pass smoke passed."
