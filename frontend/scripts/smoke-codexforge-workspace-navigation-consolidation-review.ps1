param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\workspace-navigation-consolidation-review"
$route = "src\app\workspace-navigation-consolidation-review"
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
  -PhaseName "Phase 353 Workspace Navigation Consolidation Review" `
  -ScriptFile "smoke-codexforge-workspace-navigation-consolidation-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "WorkspaceNavigationConsolidationReviewPanel" `
  -CommandLabel "Go to Workspace Navigation Consolidation Review" `
  -Modules @("workspace-navigation-consolidation-review-types.ts","workspace-navigation-consolidation-review-summary.ts","index.ts") `
  -Components @("WorkspaceNavigationConsolidationReviewPanel.tsx","index.ts") `
  -Exports @("buildWorkspaceNavigationConsolidationReviewStableKey","buildWorkspaceNavigationConsolidationReview","buildWorkspaceNavigationConsolidationReviews","buildWorkspaceNavigationConsolidationBoundary","buildWorkspaceNavigationConsolidationReviewModel","summarizeWorkspaceNavigationConsolidationReview","WORKSPACE_NAVIGATION_CONSOLIDATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Workspace navigation consolidation review","Navigation consolidation does not remove route coverage","Route changes require review before removal","No route is executed from this page","Route group summary","Command registry coverage") `
  -PlainEnglish @("Consolidation review identity","Source unified home","Duplicate/overlap risks","Novice navigation policy","Protected routes","Next recommended route","Blocked reasons","advanced navigation details collapsed/secondary","No route coverage removal","no duplicate route hrefs","no duplicate shortLabel values") `
  -ExtraRoutes @("/unified-workspace-home-review","/project-knowledge-release-candidate","/project-memory-promotion-boundary","/stabilization")

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Workspace Navigation Consolidation Review smoke passed."
