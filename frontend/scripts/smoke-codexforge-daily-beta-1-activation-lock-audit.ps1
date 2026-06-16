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
  "/daily-beta-1-activation-readiness-lock",
  "/daily-beta-1-activation-lock-audit",
  "/daily-beta-1-release-handoff-final-review",
  "/daily-beta-1-launch-readiness-summary",
  "/daily-beta-1-launch-dry-run-review",
  "/daily-beta-1-launch-evidence-review",
  "/daily-beta-1-launch-result-review",
  "/codexforge-daily-beta-1-launch-candidate",
  "/daily-beta-1-launch-readiness-lock"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 594 Daily Beta 1 Activation Lock Audit" `
  -ScriptFile "smoke-codexforge-daily-beta-1-activation-lock-audit.ps1" `
  -Domain "src\lib\codexforge\daily-beta-1-activation-lock-audit" `
  -Route "src\app\daily-beta-1-activation-lock-audit" `
  -MainPanel "DailyBetaOneActivationLockAuditPanel" `
  -CommandLabel "Go to Daily Beta 1 Activation Lock Audit" `
  -Modules @("daily-beta-1-activation-lock-audit-types.ts", "daily-beta-1-activation-lock-audit-summary.ts", "index.ts") `
  -Components @("DailyBetaOneActivationLockAuditPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaOneActivationLockAuditStableKey", "buildDailyBetaOneActivationLockAudit", "buildDailyBetaOneActivationLockAudits", "buildDailyBetaOneActivationLockAuditBoundary", "buildDailyBetaOneActivationLockAuditModel", "summarizeDailyBetaOneActivationLockAudit", "DAILY_BETA_ONE_ACTIVATION_LOCK_AUDIT_LANGUAGE") `
  -PhaseMarkers @("Daily Beta 1 activation lock audit", "Daily Beta 1 activation lock audit does not lock or freeze readiness automatically", "Activation lock audit decisions require explicit operator approval", "Unresolved activation lock audit blockers stay blocked", "Audit groups", "Final gate audit checklist") `
  -PlainEnglish @("Daily Beta 1 activation lock audit identity", "Controlled trial audit checklist", "Feedback/regression/recovery/hardening audit checklist", "Release candidate audit checklist", "Denied audit actions", "Unresolved audit blockers", "Release handoff final review route", "Launch readiness summary route", "Next recommended action", "no launch readiness lock automation", "no Daily Beta 1 launch execution", "no launch dry-run execution", "no launch approval automation", "no go-live behavior", "no evidence ingestion", "no result persistence", "no handoff send behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval") `
  -RouteHref "/daily-beta-1-activation-lock-audit" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 594 Daily Beta 1 activation lock audit smoke passed."
