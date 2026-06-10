param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\mvp-hardening-regression-matrix"
$route = "src\app\mvp-hardening-regression-matrix"
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
  -PhaseName "Phase 358 MVP Hardening Regression Matrix" `
  -ScriptFile "smoke-codexforge-mvp-hardening-regression-matrix.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "MvpHardeningRegressionMatrixPanel" `
  -CommandLabel "Go to MVP Hardening Regression Matrix" `
  -Modules @("mvp-hardening-regression-matrix-types.ts","mvp-hardening-regression-matrix-summary.ts","index.ts") `
  -Components @("MvpHardeningRegressionMatrixPanel.tsx","index.ts") `
  -Exports @("buildMvpHardeningRegressionMatrixStableKey","buildMvpHardeningRegressionMatrixLoopCoverage","buildMvpHardeningRegressionMatrixLoopCoverages","buildMvpHardeningRegressionMatrix","buildMvpHardeningRegressionMatrices","buildMvpHardeningRegressionMatrixBoundary","buildMvpHardeningRegressionMatrixModel","summarizeMvpHardeningRegressionMatrix","MVP_HARDENING_REGRESSION_MATRIX_LANGUAGE") `
  -PhaseMarkers @("MVP hardening regression matrix","Regression matrix does not run tests from this page","Hardening checks are reviewed before release","Unresolved regressions stay blocked","Core loop coverage","Release candidate route") `
  -PlainEnglish @("Regression matrix identity","Source guided trial","Build/smoke coverage summary","Safety boundary coverage","Route/navigation coverage","Known gaps","Blocked reasons","advanced regression details collapsed/secondary","review-only","approval required","no regression checks run from UI","no build execution from UI","no smoke execution from UI","no release/shipping execution","no workflow execution","no file export/write behavior","no token storage","no localStorage/sessionStorage token storage","no prompt/file/project/connector data sending without approval","No route coverage removal","no duplicate route hrefs","no duplicate shortLabel values") `
  -ExtraRoutes @("/mvp-end-to-end-guided-trial","/operator-dashboard-release-candidate","/cross-loop-safety-audit-inbox","/codexforge-foundation-release-candidate")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "testExecutionFromUiAllowed:\s*true|runTests\s*\(|executeTests\s*\(" "no test execution from UI"
Assert-NotMatches $source "buildExecutionFromUiAllowed:\s*true|runBuild\s*\(|executeBuild\s*\(" "no build execution from UI"
Assert-NotMatches $source "smokeExecutionFromUiAllowed:\s*true|runSmoke\s*\(|executeSmoke\s*\(" "no smoke execution from UI"
Assert-NotMatches $source "regressionChecksRunFromUiAllowed:\s*true|runRegression\s*\(|executeRegression\s*\(" "no regression checks run from UI"
Assert-NotMatches $source "releaseShippingExecutionAllowedFromUi:\s*true|shipRelease\s*\(|publishRelease\s*\(|deployRelease\s*\(" "no release/shipping execution"
Assert-NotMatches $source "workflowExecutionAllowedFromUi:\s*true|workflowAutomaticRunAllowed:\s*true|runWorkflow\s*\(|executeWorkflow\s*\(" "no workflow execution"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge MVP Hardening Regression Matrix smoke passed."
