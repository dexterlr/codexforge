param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\codexforge-daily-beta-release-candidate"
$route = "src\app\codexforge-daily-beta-release-candidate"
$phaseMarkers = @(
  "CodexForge Daily Beta release candidate",
  "CodexForge Daily Beta release candidate does not go live",
  "Daily Beta release requires explicit operator approval",
  "Unresolved Daily Beta blockers stay blocked",
  "Daily beta release candidate identity",
  "Daily workflow readiness status"
)
$plainEnglish = @(
  "multi-workflow status",
  "controlled live signoff status",
  "approval/safety readiness status",
  "denied Daily Beta release actions",
  "unresolved Daily Beta blockers",
  "Daily Beta controlled operator trial route",
  "Daily Beta feedback review route",
  "next recommended action",
  "no daily beta launch",
  "advanced Daily Beta release candidate details collapsed/secondary"
)
$newRoutes = @(
  "/multi-workflow-operator-trial-plan",
  "/multi-workflow-trial-review",
  "/multi-workflow-regression-review",
  "/multi-workflow-release-candidate",
  "/controlled-live-capability-signoff",
  "/codexforge-daily-beta-release-candidate",
  "/daily-beta-controlled-operator-trial",
  "/daily-beta-feedback-review"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 511 CodexForge Daily Beta Release Candidate" `
  -ScriptFile "smoke-codexforge-daily-beta-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CodexForgeDailyBetaReleaseCandidatePanel" `
  -CommandLabel "Go to CodexForge Daily Beta Release Candidate" `
  -Modules @("codexforge-daily-beta-release-candidate-types.ts","codexforge-daily-beta-release-candidate-summary.ts","index.ts") `
  -Components @("CodexForgeDailyBetaReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildCodexForgeDailyBetaReleaseCandidateStableKey","buildCodexForgeDailyBetaReleaseCandidate","buildCodexForgeDailyBetaReleaseCandidates","buildCodexForgeDailyBetaReleaseCandidateBoundary","buildCodexForgeDailyBetaReleaseCandidateModel","summarizeCodexForgeDailyBetaReleaseCandidate","CODEXFORGE_DAILY_BETA_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/controlled-live-capability-signoff","/daily-beta-controlled-operator-trial","/daily-beta-feedback-review","/multi-workflow-release-candidate") `
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

Write-Host "[OK] CodexForge Daily Beta Release Candidate smoke passed."
