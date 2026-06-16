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
  -PhaseName "Phase 570 Daily Beta Activation Final Gate" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-final-gate.ps1" `
  -Domain "src\lib\codexforge\daily-beta-activation-final-gate" `
  -Route "src\app\daily-beta-activation-final-gate" `
  -MainPanel "DailyBetaActivationFinalGatePanel" `
  -CommandLabel "Go to Daily Beta Activation Final Gate" `
  -Modules @("daily-beta-activation-final-gate-types.ts", "daily-beta-activation-final-gate-summary.ts", "index.ts") `
  -Components @("DailyBetaActivationFinalGatePanel.tsx", "index.ts") `
  -Exports @("buildDailyBetaActivationFinalGateStableKey", "buildDailyBetaActivationFinalGate", "buildDailyBetaActivationFinalGates", "buildDailyBetaActivationFinalGateBoundary", "buildDailyBetaActivationFinalGateModel", "summarizeDailyBetaActivationFinalGate", "DAILY_BETA_ACTIVATION_FINAL_GATE_LANGUAGE") `
  -PhaseMarkers @("Daily Beta activation final gate", "Daily Beta activation final gate does not activate Daily Beta", "Final gate decisions require explicit operator approval", "Unresolved final gate blockers stay blocked", "Final gate groups", "Live boundary status") `
  -PlainEnglish @("Activation final gate identity", "Activation checklist status", "Dry-run/evidence/result/recovery/hardening status", "Operator readiness status", "Denied final gate actions", "Unresolved final gate blockers", "Controlled operator trial route", "Feedback inbox route", "Next recommended action", "no final gate auto-pass", "no final gate automation", "no activation execution", "no Daily Beta activation from UI", "no controlled operator trial execution", "no workflow execution", "no go-live behavior", "no release handoff send behavior", "no readiness lock automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/daily-beta-activation-final-gate" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 570 Daily Beta activation final gate smoke passed."
