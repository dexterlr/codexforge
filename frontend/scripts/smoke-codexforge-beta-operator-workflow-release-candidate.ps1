param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\beta-operator-workflow-release-candidate"
$route = "src\app\beta-operator-workflow-release-candidate"
$phaseMarkers = @(
  "Beta operator workflow release candidate",
  "Beta operator workflow release candidate does not go live",
  "Beta workflow release requires explicit operator approval",
  "Unresolved beta blockers stay blocked",
  "Daily workflow trial status",
  "Safety approval readiness status"
)
$plainEnglish = @(
  "beta operator workflow candidate identity",
  "workflow review status",
  "friction patch status",
  "denied beta workflow paths",
  "unresolved beta blockers",
  "next milestone route",
  "operator cockpit route",
  "next recommended action",
  "no go-live behavior",
  "no settings persistence",
  "advanced release candidate details collapsed/secondary"
)
$protectedRoutes = @(
  "/beta-operator-daily-workflow-trial",
  "/beta-operator-daily-workflow-review",
  "/beta-operator-workflow-friction-patch",
  "/beta-operator-workflow-release-candidate"
)

& (Join-Path $PSScriptRoot "codexforge-beta-review-phase-smoke-helper.ps1") `
  -PhaseName "Phase 481 Beta Operator Workflow Release Candidate" `
  -ScriptFile "smoke-codexforge-beta-operator-workflow-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "BetaOperatorWorkflowReleaseCandidatePanel" `
  -CommandLabel "Go to Beta Operator Workflow Release Candidate" `
  -Modules @("beta-operator-workflow-release-candidate-types.ts","beta-operator-workflow-release-candidate-summary.ts","index.ts") `
  -Components @("BetaOperatorWorkflowReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildBetaOperatorWorkflowReleaseCandidateStableKey","buildBetaOperatorWorkflowReleaseCandidate","buildBetaOperatorWorkflowReleaseCandidates","buildBetaOperatorWorkflowReleaseCandidateBoundary","buildBetaOperatorWorkflowReleaseCandidateModel","summarizeBetaOperatorWorkflowReleaseCandidate","BETA_OPERATOR_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -ExtraRoutes @("/beta-operator-daily-workflow-trial","/beta-operator-daily-workflow-review","/beta-operator-workflow-friction-patch","/operator-cockpit-release-candidate") `
  -ProtectedRoutes $protectedRoutes

& (Join-Path $PSScriptRoot "codexforge-live-integration-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish

Write-Host "[OK] CodexForge Beta Operator Workflow Release Candidate smoke passed."
