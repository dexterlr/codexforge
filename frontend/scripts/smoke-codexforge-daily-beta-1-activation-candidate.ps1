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
  "/codexforge-daily-beta-1-activation-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-controlled-trial-boundary-smoke-helper.ps1") `
  -PhaseName "Phase 585 CodexForge Daily Beta 1 Activation Candidate" `
  -ScriptFile "smoke-codexforge-daily-beta-1-activation-candidate.ps1" `
  -Domain "src\lib\codexforge\codexforge-daily-beta-1-activation-candidate" `
  -Route "src\app\codexforge-daily-beta-1-activation-candidate" `
  -MainPanel "CodexForgeDailyBetaOneActivationCandidatePanel" `
  -CommandLabel "Go to CodexForge Daily Beta 1 Activation Candidate" `
  -Modules @("codexforge-daily-beta-1-activation-candidate-types.ts", "codexforge-daily-beta-1-activation-candidate-summary.ts", "index.ts") `
  -Components @("CodexForgeDailyBetaOneActivationCandidatePanel.tsx", "index.ts") `
  -Exports @("buildCodexForgeDailyBetaOneActivationCandidateStableKey", "buildCodexForgeDailyBetaOneActivationCandidate", "buildCodexForgeDailyBetaOneActivationCandidates", "buildCodexForgeDailyBetaOneActivationCandidateBoundary", "buildCodexForgeDailyBetaOneActivationCandidateModel", "summarizeCodexForgeDailyBetaOneActivationCandidate", "CODEXFORGE_DAILY_BETA_ONE_ACTIVATION_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("CodexForge Daily Beta 1 activation candidate", "CodexForge Daily Beta 1 activation candidate does not go live", "Daily Beta 1 activation requires explicit operator approval", "Unresolved activation candidate blockers stay blocked", "Daily Beta 1 activation candidate identity", "Final operator regression recovery hardening status") `
  -PlainEnglish @("Readiness lock audit status", "Release candidate summary status", "Live boundary status", "Denied activation candidate actions", "Unresolved activation candidate blockers", "Checkpoint docs route", "Release readiness dashboard route", "Next recommended action", "no go-live behavior", "no activation execution", "no Daily Beta 1 activation execution", "no Daily Beta 1 activation from UI", "no settings persistence", "no workflow execution", "no release approval automation", "no final operator signoff automation", "no final regression/test execution", "no recovery trigger", "no hardening apply behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/codexforge-daily-beta-1-activation-candidate" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 585 Daily Beta 1 activation candidate smoke passed."
