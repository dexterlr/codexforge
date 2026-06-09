param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\unified-workspace-home-review"
$route = "src\app\unified-workspace-home-review"
$protectedRoutes = @(
  "/local-project-snapshot-review",
  "/local-project-change-timeline",
  "/local-project-decision-log",
  "/local-project-runbook-export-review",
  "/project-memory-promotion-boundary",
  "/project-knowledge-release-candidate",
  "/unified-workspace-home-review",
  "/workspace-navigation-consolidation-review"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 352 Unified Workspace Home Review" `
  -ScriptFile "smoke-codexforge-unified-workspace-home-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "UnifiedWorkspaceHomeReviewPanel" `
  -CommandLabel "Go to Unified Workspace Home Review" `
  -Modules @("unified-workspace-home-review-types.ts","unified-workspace-home-review-summary.ts","index.ts") `
  -Components @("UnifiedWorkspaceHomeReviewPanel.tsx","index.ts") `
  -Exports @("buildUnifiedWorkspaceHomeReviewStableKey","buildUnifiedWorkspaceHomeReview","buildUnifiedWorkspaceHomeReviews","buildUnifiedWorkspaceHomeReviewBoundary","buildUnifiedWorkspaceHomeReviewModel","summarizeUnifiedWorkspaceHomeReview","UNIFIED_WORKSPACE_HOME_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Unified workspace home review","Unified workspace does not execute actions","All execution remains behind explicit approval gates","This page is a review surface not an automation surface","Covered loops summary","Navigation consolidation route") `
  -PlainEnglish @("Unified home identity","Coding loop status","Provider loop status","Creative/local bridge status","Extension loop status","Research loop status","Connector loop status","Automation loop status","Project knowledge loop status","Blocked reasons","advanced workspace details collapsed/secondary","No route coverage removal","no duplicate route hrefs","no duplicate shortLabel values","route changes require review before removal") `
  -ExtraRoutes @("/project-knowledge-release-candidate","/automation-release-candidate","/connector-release-candidate","/workspace-navigation-consolidation-review")

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Unified Workspace Home Review smoke passed."
