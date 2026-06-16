param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$protectedRoutes = @(
  "/daily-beta-1-final-recovery-review",
  "/daily-beta-1-final-hardening-pass",
  "/codexforge-daily-beta-1-activation-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 584 Daily Beta 1 Final Hardening Pass" `
  -ScriptFile "smoke-codexforge-daily-beta-1-final-hardening-pass.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-final-hardening-pass" `
  -Route "src\app\daily-beta-1-final-hardening-pass" `
  -MainPanel "DailyBetaOneFinalHardeningPassPanel" `
  -CommandLabel "Go to Daily Beta 1 Final Hardening Pass" `
  -Modules @("daily-beta-1-final-hardening-pass-types.ts", "daily-beta-1-final-hardening-pass-summary.ts", "index.ts") `
  -Components @("DailyBetaOneFinalHardeningPassPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneFinalHardeningPassStableKey", "buildDailyBetaOneFinalHardeningPass", "buildDailyBetaOneFinalHardeningPasses", "buildDailyBetaOneFinalHardeningPassBoundary", "buildDailyBetaOneFinalHardeningPassModel", "summarizeDailyBetaOneFinalHardeningPass", "DAILY_BETA_ONE_FINAL_HARDENING_PASS_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 final hardening pass", "Daily Beta 1 final hardening pass does not apply changes", "Final hardening changes require explicit operator approval", "Unresolved final hardening blockers stay blocked", "Hardening groups", "Live boundary status") `
  -PlainEnglish @("Final hardening pass identity", "Final candidate status", "Final operator review status", "Final regression/recovery status", "Denied final hardening actions", "Unresolved final hardening blockers", "Daily Beta 1 activation candidate route", "Release readiness dashboard route", "Next recommended action", "no hardening apply behavior", "no file mutation", "no memory/RAG ingestion", "no workflow execution", "no recovery trigger", "no Daily Beta 1 activation execution", "no go-live behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-1-final-hardening-pass" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 584 Daily Beta 1 final hardening pass smoke passed."
