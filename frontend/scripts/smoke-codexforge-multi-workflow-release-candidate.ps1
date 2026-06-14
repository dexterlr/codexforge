param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\multi-workflow-release-candidate"
$route = "src\app\multi-workflow-release-candidate"
$phaseMarkers = @(
  "Multi-workflow release candidate",
  "Multi-workflow release candidate does not approve release",
  "Release requires explicit operator approval",
  "Unresolved release blockers stay blocked",
  "Trial plan status",
  "Safety approval readiness status"
)
$plainEnglish = @(
  "multi-workflow release candidate identity",
  "trial review status",
  "regression status",
  "denied release actions",
  "unresolved release blockers",
  "controlled live signoff route",
  "Daily Beta release candidate route",
  "next recommended action",
  "no release approval automation",
  "advanced release candidate details collapsed/secondary"
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
  -PhaseName "Phase 509 Multi-Workflow Release Candidate" `
  -ScriptFile "smoke-codexforge-multi-workflow-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "MultiWorkflowReleaseCandidatePanel" `
  -CommandLabel "Go to Multi-Workflow Release Candidate" `
  -Modules @("multi-workflow-release-candidate-types.ts","multi-workflow-release-candidate-summary.ts","index.ts") `
  -Components @("MultiWorkflowReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildMultiWorkflowReleaseCandidateStableKey","buildMultiWorkflowReleaseCandidate","buildMultiWorkflowReleaseCandidates","buildMultiWorkflowReleaseCandidateBoundary","buildMultiWorkflowReleaseCandidateModel","summarizeMultiWorkflowReleaseCandidate","MULTI_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/multi-workflow-regression-review","/controlled-live-capability-signoff","/codexforge-daily-beta-release-candidate","/release-readiness-dashboard") `
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

Write-Host "[OK] CodexForge Multi-Workflow Release Candidate smoke passed."
