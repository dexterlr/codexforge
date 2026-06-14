param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\codexforge-daily-beta-1-candidate"
$route = "src\app\codexforge-daily-beta-1-candidate"
$phaseMarkers = @(
  "CodexForge Daily Beta 1 candidate",
  "CodexForge Daily Beta 1 candidate does not go live",
  "Daily Beta 1 release requires explicit operator approval",
  "Unresolved Daily Beta 1 blockers stay blocked",
  "Daily Beta 1 candidate identity",
  "Daily Beta readiness checklist"
)
$plainEnglish = @(
  "Hardening/docs/onboarding/signoff status",
  "Multi-workflow status",
  "Controlled live status",
  "Denied Daily Beta 1 actions",
  "Unresolved Daily Beta 1 blockers",
  "Daily Beta 1 rollout plan route",
  "Daily Beta 1 rollout review route",
  "next recommended action",
  "no Daily Beta 1 launch",
  "advanced Daily Beta 1 candidate details collapsed/secondary"
)
$newRoutes = @(
  "/multi-workflow-operator-trial-plan",
  "/multi-workflow-trial-review",
  "/multi-workflow-regression-review",
  "/multi-workflow-release-candidate",
  "/controlled-live-capability-signoff",
  "/codexforge-daily-beta-release-candidate",
  "/daily-beta-controlled-operator-trial",
  "/daily-beta-feedback-review",
  "/daily-beta-hardening-pass",
  "/daily-beta-documentation-final-review",
  "/daily-beta-onboarding-final-review",
  "/daily-beta-release-signoff-review",
  "/codexforge-daily-beta-1-candidate",
  "/daily-beta-1-controlled-rollout-plan",
  "/daily-beta-1-rollout-review",
  "/daily-beta-1-feedback-inbox"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 518 CodexForge Daily Beta 1 Candidate" `
  -ScriptFile "smoke-codexforge-daily-beta-1-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CodexForgeDailyBetaOneCandidatePanel" `
  -CommandLabel "Go to CodexForge Daily Beta 1 Candidate" `
  -Modules @("codexforge-daily-beta-1-candidate-types.ts","codexforge-daily-beta-1-candidate-summary.ts","index.ts") `
  -Components @("CodexForgeDailyBetaOneCandidatePanel.tsx","index.ts") `
  -Exports @("buildCodexForgeDailyBetaOneCandidateStableKey","buildCodexForgeDailyBetaOneCandidate","buildCodexForgeDailyBetaOneCandidates","buildCodexForgeDailyBetaOneCandidateBoundary","buildCodexForgeDailyBetaOneCandidateModel","summarizeCodexForgeDailyBetaOneCandidate","CODEXFORGE_DAILY_BETA_ONE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/daily-beta-release-signoff-review","/daily-beta-1-controlled-rollout-plan","/daily-beta-1-rollout-review","/daily-beta-1-feedback-inbox") `
  -ProtectedRoutes $newRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Daily Beta 1 Candidate smoke passed."
