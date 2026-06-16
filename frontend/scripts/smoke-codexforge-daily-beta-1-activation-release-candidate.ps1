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
  -PhaseName "Phase 592 CodexForge Daily Beta 1 Activation Release Candidate" `
  -ScriptFile "smoke-codexforge-daily-beta-1-activation-release-candidate.ps1" `
  -Domain "src\lib\codexforge\codexforge-daily-beta-1-activation-release-candidate" `
  -Route "src\app\codexforge-daily-beta-1-activation-release-candidate" `
  -MainPanel "CodexForgeDailyBetaOneActivationReleaseCandidatePanel" `
  -CommandLabel "Go to CodexForge Daily Beta 1 Activation Release Candidate" `
  -Modules @("codexforge-daily-beta-1-activation-release-candidate-types.ts", "codexforge-daily-beta-1-activation-release-candidate-summary.ts", "index.ts") `
  -Components @("CodexForgeDailyBetaOneActivationReleaseCandidatePanel.tsx", "index.ts") `
  -Exports @("buildCodexForgeDailyBetaOneActivationReleaseCandidateStableKey", "buildCodexForgeDailyBetaOneActivationReleaseCandidate", "buildCodexForgeDailyBetaOneActivationReleaseCandidates", "buildCodexForgeDailyBetaOneActivationReleaseCandidateBoundary", "buildCodexForgeDailyBetaOneActivationReleaseCandidateModel", "summarizeCodexForgeDailyBetaOneActivationReleaseCandidate", "CODEXFORGE_DAILY_BETA_ONE_ACTIVATION_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("CodexForge Daily Beta 1 activation release candidate", "CodexForge Daily Beta 1 activation release candidate does not go live", "Daily Beta 1 activation requires explicit operator approval", "Unresolved Daily Beta 1 activation release blockers stay blocked", "Daily Beta 1 activation release candidate identity", "Feedback regression recovery hardening status") `
  -PlainEnglish @("Final gate status", "Controlled trial status", "Live boundary status", "Denied release candidate actions", "Unresolved release candidate blockers", "Readiness lock route", "Checkpoint docs route", "Next recommended action", "no go-live behavior", "no Daily Beta 1 activation execution", "no release candidate signoff automation", "no release approval automation", "no settings persistence", "no workflow execution", "no provider traffic routing", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/codexforge-daily-beta-1-activation-release-candidate" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 592 Daily Beta 1 activation release candidate smoke passed."
