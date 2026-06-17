param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 636 Project Scaffold Result Review" `
  -ScriptFile "smoke-codexforge-project-scaffold-result-review.ps1" `
  -Domain "src\lib\codexforge\project-scaffold-result-review" `
  -Route "src\app\project-scaffold-result-review" `
  -MainPanel "ProjectScaffoldResultReviewPanel" `
  -CommandLabel "Go to Project Scaffold Result Review" `
  -Modules @("project-scaffold-result-review-model.ts", "index.ts") `
  -Components @("ProjectScaffoldResultReviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectScaffoldResultReviewStableKey", "buildProjectScaffoldResultReview", "buildProjectScaffoldResultReviews", "buildProjectScaffoldResultReviewBoundary", "buildProjectScaffoldResultReviewModel", "summarizeProjectScaffoldResultReview", "PROJECT_SCAFFOLD_RESULT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Project scaffold result review", "Project scaffold result review does not store or reuse scaffold outputs automatically", "Scaffold results require operator approval before reuse", "Acceptance checklist", "Rejection checklist", "Reuse checklist", "Safety checklist") `
  -PlainEnglish @("Project scaffold result review identity", "Acceptance checklist", "Rejection checklist", "Reuse checklist", "Safety checklist", "Next recommended action") `
  -RouteHref "/project-scaffold-result-review"

Write-Host "[OK] CodexForge Phase 636 project scaffold result review smoke passed."
