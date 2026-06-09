param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\mvp-end-to-end-guided-trial"
$route = "src\app\mvp-end-to-end-guided-trial"
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
  -PhaseName "Phase 357 MVP End-to-End Guided Trial" `
  -ScriptFile "smoke-codexforge-mvp-end-to-end-guided-trial.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "MvpEndToEndGuidedTrialPanel" `
  -CommandLabel "Go to MVP End-to-End Guided Trial" `
  -Modules @("mvp-end-to-end-guided-trial-types.ts","mvp-end-to-end-guided-trial-summary.ts","index.ts") `
  -Components @("MvpEndToEndGuidedTrialPanel.tsx","index.ts") `
  -Exports @("buildMvpEndToEndGuidedTrialStableKey","buildMvpEndToEndGuidedTrialStep","buildMvpEndToEndGuidedTrialSteps","buildMvpEndToEndGuidedTrial","buildMvpEndToEndGuidedTrials","buildMvpEndToEndGuidedTrialBoundary","buildMvpEndToEndGuidedTrialModel","summarizeMvpEndToEndGuidedTrial","MVP_END_TO_END_GUIDED_TRIAL_LANGUAGE") `
  -PhaseMarkers @("MVP end-to-end guided trial","Guided trial is review-only until approved","No workflow runs automatically","Blocked actions remain blocked","Trial scenario summary","Expected review gates") `
  -PlainEnglish @("Guided trial identity","Simulated outcomes","Blocked actions","Regression matrix route","Release candidate route","coding","provider","creative","extension","research","connector","automation","project knowledge","dashboard","review-only","approval required","advanced trial details collapsed/secondary","no workflow execution","no file export/write behavior","no token storage","no localStorage/sessionStorage token storage","No route coverage removal","no duplicate route hrefs","no duplicate shortLabel values") `
  -ExtraRoutes @("/operator-dashboard-release-candidate","/cross-loop-safety-audit-inbox","/stabilization","/cross-loop-result-handoff-review")

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

Write-Host "[OK] CodexForge MVP End-to-End Guided Trial smoke passed."
