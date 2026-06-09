param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\project-memory-promotion-boundary"
$route = "src\app\project-memory-promotion-boundary"
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
  -PhaseName "Phase 350 Project Memory Promotion Boundary" `
  -ScriptFile "smoke-codexforge-project-memory-promotion-boundary.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProjectMemoryPromotionBoundaryPanel" `
  -CommandLabel "Go to Project Memory Promotion Boundary" `
  -Modules @("project-memory-promotion-boundary-types.ts","project-memory-promotion-boundary-summary.ts","index.ts") `
  -Components @("ProjectMemoryPromotionBoundaryPanel.tsx","index.ts") `
  -Exports @("buildProjectMemoryPromotionBoundaryStableKey","buildProjectMemoryPromotionBoundaryReview","buildProjectMemoryPromotionBoundaryReviews","buildProjectMemoryPromotionBoundaryPolicy","buildProjectMemoryPromotionBoundaryModel","summarizeProjectMemoryPromotionBoundary","PROJECT_MEMORY_PROMOTION_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Project memory promotion boundary","Memory promotion requires explicit review","No project memory is promoted from this page","Secrets and local paths stay redacted","Candidate knowledge summary","Knowledge release route") `
  -PlainEnglish @("Promotion boundary identity","Source snapshot/timeline/decision log/runbook","Allowed promotion scope","Denied promotion scope","Redaction/privacy checklist","Approval requirement","Blocked reasons","advanced memory details collapsed/secondary","No route coverage removal","no duplicate route hrefs","no duplicate shortLabel values","route changes require review before removal") `
  -ExtraRoutes @("/local-project-snapshot-review","/local-project-change-timeline","/local-project-decision-log","/project-knowledge-release-candidate")

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $protectedRoutes

Write-Host "[OK] CodexForge Project Memory Promotion Boundary smoke passed."
