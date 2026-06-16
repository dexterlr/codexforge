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
  -PhaseName "Phase 568 CodexForge Daily Beta Activation Release Candidate" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-release-candidate.ps1" `
  -Domain "src\lib\codexforge\codexforge-daily-beta-activation-release-candidate" `
  -Route "src\app\codexforge-daily-beta-activation-release-candidate" `
  -MainPanel "CodexForgeDailyBetaActivationReleaseCandidatePanel" `
  -CommandLabel "Go to CodexForge Daily Beta Activation Release Candidate" `
  -Modules @("codexforge-daily-beta-activation-release-candidate-types.ts", "codexforge-daily-beta-activation-release-candidate-summary.ts", "index.ts") `
  -Components @("CodexForgeDailyBetaActivationReleaseCandidatePanel.tsx", "index.ts") `
  -Exports @("buildCodexForgeDailyBetaActivationReleaseCandidateStableKey", "buildCodexForgeDailyBetaActivationReleaseCandidate", "buildCodexForgeDailyBetaActivationReleaseCandidates", "buildCodexForgeDailyBetaActivationReleaseCandidateBoundary", "buildCodexForgeDailyBetaActivationReleaseCandidateModel", "summarizeCodexForgeDailyBetaActivationReleaseCandidate", "CODEXFORGE_DAILY_BETA_ACTIVATION_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("CodexForge Daily Beta activation release candidate", "CodexForge Daily Beta activation release candidate does not go live", "Daily Beta activation requires explicit operator approval", "Unresolved activation release blockers stay blocked", "Activation release candidate identity", "Evidence result recovery hardening status") `
  -PlainEnglish @("Checklist status", "Dry-run status", "Live boundary status", "Denied activation release actions", "Unresolved activation release blockers", "Operator readiness review route", "Release readiness dashboard route", "Next recommended action", "no activation execution", "no activation dry-run execution", "no Daily Beta activation from UI", "no recovery trigger", "no hardening apply behavior", "no release candidate signoff automation", "no operator readiness signoff automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/codexforge-daily-beta-activation-release-candidate" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 568 Daily Beta activation release candidate smoke passed."
