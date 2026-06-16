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
  "/daily-beta-activation-operator-readiness-review",
  "/daily-beta-activation-final-gate",
  "/daily-beta-activation-controlled-operator-trial",
  "/daily-beta-activation-feedback-inbox",
  "/daily-beta-activation-regression-review",
  "/daily-beta-activation-final-hardening",
  "/codexforge-daily-beta-activation-candidate",
  "/daily-beta-activation-release-handoff",
  "/daily-beta-activation-readiness-lock",
  "/daily-beta-readiness-lock-audit",
  "/daily-beta-release-candidate-summary",
  "/codexforge-daily-beta-1-final-candidate",
  "/daily-beta-1-final-operator-review",
  "/daily-beta-1-final-regression-review",
  "/daily-beta-1-final-recovery-review",
  "/daily-beta-1-final-hardening-pass",
  "/codexforge-daily-beta-1-activation-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 578 Daily Beta Readiness Lock Audit" `
  -ScriptFile "smoke-codexforge-daily-beta-readiness-lock-audit.ps1" `
  -Domain "src\lib\codexforge\daily-beta-readiness-lock-audit" `
  -Route "src\app\daily-beta-readiness-lock-audit" `
  -MainPanel "DailyBetaReadinessLockAuditPanel" `
  -CommandLabel "Go to Daily Beta Readiness Lock Audit" `
  -Modules @("daily-beta-readiness-lock-audit-types.ts", "daily-beta-readiness-lock-audit-summary.ts", "index.ts") `
  -Components @("DailyBetaReadinessLockAuditPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaReadinessLockAuditStableKey", "buildDailyBetaReadinessLockAudit", "buildDailyBetaReadinessLockAudits", "buildDailyBetaReadinessLockAuditBoundary", "buildDailyBetaReadinessLockAuditModel", "summarizeDailyBetaReadinessLockAudit", "DAILY_BETA_READINESS_LOCK_AUDIT_LANGUAGE") `
  -PhaseMarkers @("Daily Beta readiness lock audit", "Daily Beta readiness lock audit does not lock or freeze readiness automatically", "Readiness lock audit decisions require explicit operator approval", "Unresolved readiness lock audit blockers stay blocked", "Audit groups", "Final gate audit checklist") `
  -PlainEnglish @("Readiness lock audit identity", "Controlled trial audit checklist", "Feedback/regression/final hardening audit checklist", "Release handoff audit checklist", "Denied audit actions", "Unresolved audit blockers", "Release candidate summary route", "Daily Beta 1 final candidate route", "Next recommended action", "no audit-lock automation", "no readiness lock automation", "no activation execution", "no Daily Beta 1 activation execution", "no Daily Beta 1 activation from UI", "no release approval automation", "no final operator signoff automation", "no final regression/test execution", "no recovery trigger", "no hardening apply behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-readiness-lock-audit" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 578 Daily Beta readiness lock audit smoke passed."
