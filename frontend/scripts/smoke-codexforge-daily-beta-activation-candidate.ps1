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
  -PhaseName "Phase 575 CodexForge Daily Beta Activation Candidate" `
  -ScriptFile "smoke-codexforge-daily-beta-activation-candidate.ps1" `
  -Domain "src\lib\codexforge\codexforge-daily-beta-activation-candidate" `
  -Route "src\app\codexforge-daily-beta-activation-candidate" `
  -MainPanel "CodexForgeDailyBetaActivationCandidatePanel" `
  -CommandLabel "Go to CodexForge Daily Beta Activation Candidate" `
  -Modules @("codexforge-daily-beta-activation-candidate-types.ts", "codexforge-daily-beta-activation-candidate-summary.ts", "index.ts") `
  -Components @("CodexForgeDailyBetaActivationCandidatePanel.tsx", "index.ts") `
  -Exports @("buildCodexForgeDailyBetaActivationCandidateStableKey", "buildCodexForgeDailyBetaActivationCandidate", "buildCodexForgeDailyBetaActivationCandidates", "buildCodexForgeDailyBetaActivationCandidateBoundary", "buildCodexForgeDailyBetaActivationCandidateModel", "summarizeCodexForgeDailyBetaActivationCandidate", "CODEXFORGE_DAILY_BETA_ACTIVATION_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("CodexForge Daily Beta activation candidate", "CodexForge Daily Beta activation candidate does not go live", "Daily Beta activation requires explicit operator approval", "Unresolved activation candidate blockers stay blocked", "Daily Beta activation candidate identity", "Live boundary status") `
  -PlainEnglish @("Final gate status", "Controlled trial status", "Feedback/regression/final hardening status", "Denied activation candidate actions", "Unresolved activation candidate blockers", "Release handoff route", "Readiness lock route", "Next recommended action", "no go-live behavior", "no activation execution", "no Daily Beta activation from UI", "no settings persistence", "no final gate auto-pass", "no controlled operator trial execution", "no release handoff send behavior", "no readiness lock automation", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation data sending without approval") `
  -RouteHref "/codexforge-daily-beta-activation-candidate" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 575 Daily Beta activation candidate smoke passed."
