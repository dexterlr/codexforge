param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 966 Project Builder Operator Review" `
  -ScriptFile "smoke-codexforge-project-builder-operator-review.ps1" `
  -Domain "src\lib\codexforge\project-builder-operator-review" `
  -Route "src\app\project-builder-operator-review" `
  -MainPanel "ProjectBuilderOperatorReviewPanel" `
  -CommandLabel "Go to Project Builder Operator Review" `
  -Modules @("project-builder-operator-review-model.ts", "index.ts") `
  -Components @("ProjectBuilderOperatorReviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectBuilderOperatorReviewStableKey", "buildProjectBuilderOperatorReview", "buildProjectBuilderOperatorReviewItems", "buildProjectBuilderOperatorReviewBoundary", "buildProjectBuilderOperatorReviewModel", "summarizeProjectBuilderOperatorReview", "PROJECT_BUILDER_OPERATOR_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Project builder operator review", "Project builder operator review does not execute actions", "Operator review requires explicit human approval", "Operator review checks goal plan risk budget and privacy", "Denied project builder review paths remain blocked", "Project builder operator review checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project builder operator review does not execute actions", "Operator review requires explicit human approval", "Denied project builder review paths remain blocked") `
  -RouteHref "/project-builder-operator-review"

Write-Host "[OK] CodexForge Phase 966 Project builder operator review smoke passed."
