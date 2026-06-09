param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\operator-dashboard-release-candidate"
$route = "src\app\operator-dashboard-release-candidate"
$protectedRoutes = @(
  "/project-knowledge-release-candidate",
  "/unified-workspace-home-review",
  "/workspace-navigation-consolidation-review",
  "/cross-loop-result-handoff-review",
  "/cross-loop-safety-audit-inbox",
  "/operator-dashboard-release-candidate",
  "/mvp-end-to-end-guided-trial"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 356 Operator Dashboard Release Candidate" `
  -ScriptFile "smoke-codexforge-operator-dashboard-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "OperatorDashboardReleaseCandidatePanel" `
  -CommandLabel "Go to Operator Dashboard Release Candidate" `
  -Modules @("operator-dashboard-release-candidate-types.ts","operator-dashboard-release-candidate-summary.ts","index.ts") `
  -Components @("OperatorDashboardReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildOperatorDashboardReleaseCandidateStableKey","buildOperatorDashboardLoopCard","buildOperatorDashboardLoopCards","buildOperatorDashboardReleaseCandidate","buildOperatorDashboardReleaseCandidates","buildOperatorDashboardReleaseBoundary","buildOperatorDashboardReleaseCandidateModel","summarizeOperatorDashboardReleaseCandidate","OPERATOR_DASHBOARD_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("Operator dashboard release candidate","Operator dashboard release remains review-only","Dashboard does not run workflows automatically","Execution remains behind explicit approval gates","Release readiness by loop","Guided trial route") `
  -PlainEnglish @("Dashboard release identity","Covered loop cards","Safety/audit readiness","Navigation readiness","Known gaps","Release decision","Next recommended route","review-only","approval required","advanced dashboard details collapsed/secondary","no workflow execution","no workflow runs automatically","no file export/write behavior","no token storage","no localStorage/sessionStorage token storage","No route coverage removal","no duplicate route hrefs","no duplicate shortLabel values") `
  -ExtraRoutes @("/cross-loop-safety-audit-inbox","/mvp-end-to-end-guided-trial","/unified-workspace-home-review","/workspace-navigation-consolidation-review")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "workflowExecutionAllowedFromUi:\s*true|workflowAutomaticRunAllowed:\s*true|runWorkflow\s*\(|executeWorkflow\s*\(" "no workflow execution"
Assert-NotMatches $source "tokenStorageAllowed:\s*true|localStorageTokenStorageAllowed:\s*true|sessionStorageTokenStorageAllowed:\s*true|localStorage\.setItem|sessionStorage\.setItem" "no token storage"
Assert-NotMatches $source "fileExportAllowedFromUi:\s*true|downloadFile\s*\(|exportFile\s*\(" "no export/write behavior"
Assert-NotMatches $source "routeCoverageRemovalAllowed:\s*true|removeRoute\s*\(|deleteRoute\s*\(" "no route coverage removal"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Operator Dashboard Release Candidate smoke passed."
