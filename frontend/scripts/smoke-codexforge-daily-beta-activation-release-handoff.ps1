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
  "/daily-beta-activation-readiness-lock"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 576 Daily Beta Activation Release Handoff" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-release-handoff.ps1" `
  -Domain "src\lib\codexforge\daily-beta-activation-release-handoff" `
  -Route "src\app\daily-beta-activation-release-handoff" `
  -MainPanel "DailyBetaActivationReleaseHandoffPanel" `
  -CommandLabel "Go to Daily Beta Activation Release Handoff" `
  -Modules @("daily-beta-activation-release-handoff-types.ts", "daily-beta-activation-release-handoff-summary.ts", "index.ts") `
  -Components @("DailyBetaActivationReleaseHandoffPanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaActivationReleaseHandoffStableKey", "buildDailyBetaActivationReleaseHandoff", "buildDailyBetaActivationReleaseHandoffs", "buildDailyBetaActivationReleaseHandoffBoundary", "buildDailyBetaActivationReleaseHandoffModel", "summarizeDailyBetaActivationReleaseHandoff", "DAILY_BETA_ACTIVATION_RELEASE_HANDOFF_LANGUAGE") `
  -PhaseMarkers @("Daily Beta activation release handoff", "Daily Beta activation release handoff does not send or apply handoff automatically", "Release handoff requires explicit operator approval", "Unresolved handoff blockers stay blocked", "Handoff groups", "Live boundary limitation summary") `
  -PlainEnglish @("Activation release handoff identity", "Operator runbook summary", "Final gate summary", "Rollout limitation summary", "Denied handoff actions", "Unresolved handoff blockers", "Readiness lock route", "Activation candidate route", "Next recommended action", "no handoff send behavior", "no release handoff send behavior", "no export/write behavior", "no file mutation", "no memory/RAG ingestion", "no final gate auto-pass", "no controlled operator trial execution", "no readiness lock automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-activation-release-handoff" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 576 Daily Beta activation release handoff smoke passed."
