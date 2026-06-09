param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\cross-loop-result-handoff-review"
$route = "src\app\cross-loop-result-handoff-review"
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
  -PhaseName "Phase 354 Cross-Loop Result Handoff Review" `
  -ScriptFile "smoke-codexforge-cross-loop-result-handoff-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CrossLoopResultHandoffReviewPanel" `
  -CommandLabel "Go to Cross-Loop Result Handoff Review" `
  -Modules @("cross-loop-result-handoff-review-types.ts","cross-loop-result-handoff-review-summary.ts","index.ts") `
  -Components @("CrossLoopResultHandoffReviewPanel.tsx","index.ts") `
  -Exports @("buildCrossLoopResultHandoffReviewStableKey","buildCrossLoopResultHandoffReview","buildCrossLoopResultHandoffReviews","buildCrossLoopResultHandoffBoundary","buildCrossLoopResultHandoffReviewModel","summarizeCrossLoopResultHandoffReview","CROSS_LOOP_RESULT_HANDOFF_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Cross-loop result handoff review","Cross-loop handoffs are reviewed before use","Handoffs do not execute actions","Private details stay redacted until approved","Handoff artifact summary","Safety audit route") `
  -PlainEnglish @("Handoff review identity","Source loop summary","Destination loop summary","Approval state","Redaction/privacy state","Blocked handoff reasons","Dashboard route","review-only","approval required","advanced handoff details collapsed/secondary","no workflow execution","no workflow runs automatically","no file export/write behavior","no token storage","no localStorage/sessionStorage token storage","No route coverage removal","no duplicate route hrefs","no duplicate shortLabel values") `
  -ExtraRoutes @("/cross-loop-safety-audit-inbox","/operator-dashboard-release-candidate","/unified-workspace-home-review","/workspace-navigation-consolidation-review")

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

Write-Host "[OK] CodexForge Cross-Loop Result Handoff Review smoke passed."
