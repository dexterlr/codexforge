param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\codexforge-beta-2-release-candidate"
$route = "src\app\codexforge-beta-2-release-candidate"
$phaseMarkers = @(
  "CodexForge Beta 2 release candidate",
  "CodexForge Beta 2 release candidate does not go live",
  "Beta 2 release requires explicit operator approval",
  "Unresolved Beta 2 blockers stay blocked",
  "Regression status",
  "Live workflow readiness status"
)
$plainEnglish = @(
  "Beta 2 release candidate identity",
  "safety signoff status",
  "documentation status",
  "onboarding status",
  "denied release paths",
  "unresolved Beta 2 blockers",
  "controlled operator trial route",
  "operator feedback review route",
  "next recommended action",
  "no go-live behavior",
  "advanced Beta 2 release candidate details collapsed/secondary"
)
$protectedRoutes = @(
  "/beta-workflow-release-regression-review",
  "/beta-workflow-safety-signoff-review",
  "/beta-workflow-documentation-review",
  "/beta-workflow-onboarding-final-pass",
  "/codexforge-beta-2-release-candidate",
  "/beta-2-controlled-operator-trial",
  "/beta-2-operator-feedback-review",
  "/beta-2-hardening-pass"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 486 CodexForge Beta 2 Release Candidate" `
  -ScriptFile "smoke-codexforge-beta-2-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CodexForgeBetaTwoReleaseCandidatePanel" `
  -CommandLabel "Go to CodexForge Beta 2 Release Candidate" `
  -Modules @("codexforge-beta-2-release-candidate-types.ts","codexforge-beta-2-release-candidate-summary.ts","index.ts") `
  -Components @("CodexForgeBetaTwoReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildCodexForgeBetaTwoReleaseCandidateStableKey","buildCodexForgeBetaTwoReleaseCandidate","buildCodexForgeBetaTwoReleaseCandidates","buildCodexForgeBetaTwoReleaseCandidateBoundary","buildCodexForgeBetaTwoReleaseCandidateModel","summarizeCodexForgeBetaTwoReleaseCandidate","CODEXFORGE_BETA_TWO_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/beta-workflow-release-regression-review","/beta-workflow-safety-signoff-review","/beta-2-controlled-operator-trial","/beta-2-operator-feedback-review") `
  -ProtectedRoutes $protectedRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

Write-Host "[OK] CodexForge Beta 2 Release Candidate smoke passed."
