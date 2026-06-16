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
  -PhaseName "Phase 600 CodexForge Daily Beta 1 Launch Candidate" `
  -ScriptFile "smoke-codexforge-daily-beta-1-launch-candidate.ps1" `
  -Domain "src\lib\codexforge\codexforge-daily-beta-1-launch-candidate" `
  -Route "src\app\codexforge-daily-beta-1-launch-candidate" `
  -MainPanel "CodexForgeDailyBetaOneLaunchCandidatePanel" `
  -CommandLabel "Go to CodexForge Daily Beta 1 Launch Candidate" `
  -Modules @("codexforge-daily-beta-1-launch-candidate-types.ts", "codexforge-daily-beta-1-launch-candidate-summary.ts", "index.ts") `
  -Components @("CodexForgeDailyBetaOneLaunchCandidatePanel.tsx", "index.ts") `
  -Exports @("buildCodexForgeDailyBetaOneLaunchCandidateStableKey", "buildCodexForgeDailyBetaOneLaunchCandidate", "buildCodexForgeDailyBetaOneLaunchCandidates", "buildCodexForgeDailyBetaOneLaunchCandidateBoundary", "buildCodexForgeDailyBetaOneLaunchCandidateModel", "summarizeCodexForgeDailyBetaOneLaunchCandidate", "CODEXFORGE_DAILY_BETA_ONE_LAUNCH_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("CodexForge Daily Beta 1 launch candidate", "CodexForge Daily Beta 1 launch candidate does not launch Daily Beta 1", "Daily Beta 1 launch requires explicit operator approval", "Unresolved launch candidate blockers stay blocked", "Daily Beta 1 launch candidate identity", "Launch readiness dry-run evidence result status") `
  -PlainEnglish @("Activation lock audit status", "Final handoff status", "Live boundary status", "Denied launch candidate actions", "Unresolved launch candidate blockers", "Launch readiness lock route", "Release readiness dashboard route", "Next recommended action", "no Daily Beta 1 launch execution", "no go-live behavior", "no settings persistence", "no launch approval automation", "no launch readiness lock automation", "no launch dry-run execution", "no evidence ingestion", "no result persistence", "no handoff send behavior", "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval") `
  -RouteHref "/codexforge-daily-beta-1-launch-candidate" `
  -ProtectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Phase 600 Daily Beta 1 launch candidate smoke passed."
