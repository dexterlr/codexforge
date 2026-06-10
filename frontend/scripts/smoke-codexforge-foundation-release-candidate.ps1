param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\foundation-release-candidate"
$route = "src\app\codexforge-foundation-release-candidate"
$protectedRoutes = @(
  "/project-knowledge-release-candidate",
  "/unified-workspace-home-review",
  "/workspace-navigation-consolidation-review",
  "/cross-loop-result-handoff-review",
  "/cross-loop-safety-audit-inbox",
  "/operator-dashboard-release-candidate",
  "/mvp-end-to-end-guided-trial",
  "/mvp-hardening-regression-matrix",
  "/codexforge-foundation-release-candidate",
  "/foundation-release-runbook-finalization",
  "/first-real-operator-workflow-trial"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 359 CodexForge Foundation Release Candidate" `
  -ScriptFile "smoke-codexforge-foundation-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FoundationReleaseCandidatePanel" `
  -CommandLabel "Go to CodexForge Foundation Release Candidate" `
  -Modules @("foundation-release-candidate-types.ts","foundation-release-candidate-summary.ts","index.ts") `
  -Components @("FoundationReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildFoundationReleaseCandidateStableKey","buildFoundationReleaseLoopReadiness","buildFoundationReleaseLoopReadinessList","buildFoundationReleaseCandidate","buildFoundationReleaseCandidates","buildFoundationReleaseCandidateBoundary","buildFoundationReleaseCandidateModel","summarizeFoundationReleaseCandidate","FOUNDATION_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("CodexForge foundation release candidate","Foundation release candidate remains review-only","Release does not ship automatically","Execution remains behind explicit approval gates","Release readiness by loop","Release decision") `
  -PlainEnglish @("Foundation release identity","Covered foundation loops","Regression readiness","Safety/audit readiness","Operator dashboard readiness","Known gaps","Release runbook route","First real workflow route","advanced release details collapsed/secondary","review-only","approval required","no release/shipping execution","no build execution from UI","no smoke execution from UI","no workflow execution","no file export/write behavior","no token storage","no localStorage/sessionStorage token storage","no prompt/file/project/connector data sending without approval","No route coverage removal","no duplicate route hrefs","no duplicate shortLabel values") `
  -ExtraRoutes @("/mvp-hardening-regression-matrix","/operator-dashboard-release-candidate","/foundation-release-runbook-finalization","/first-real-operator-workflow-trial")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "releaseShippingExecutionAllowedFromUi:\s*true|shipRelease\s*\(|publishRelease\s*\(|deployRelease\s*\(" "no release/shipping execution"
Assert-NotMatches $source "buildExecutionFromUiAllowed:\s*true|runBuild\s*\(|executeBuild\s*\(" "no build execution from UI"
Assert-NotMatches $source "smokeExecutionFromUiAllowed:\s*true|runSmoke\s*\(|executeSmoke\s*\(" "no smoke execution from UI"
Assert-NotMatches $source "testExecutionFromUiAllowed:\s*true|runTests\s*\(|executeTests\s*\(" "no test execution from UI"
Assert-NotMatches $source "workflowExecutionAllowedFromUi:\s*true|workflowAutomaticRunAllowed:\s*true|runWorkflow\s*\(|executeWorkflow\s*\(" "no workflow execution"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Foundation Release Candidate smoke passed."
