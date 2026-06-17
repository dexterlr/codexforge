param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 635 Project Scaffold Evidence Review" `
  -ScriptFile "smoke-codexforge-project-scaffold-evidence-review.ps1" `
  -Domain "src\lib\codexforge\project-scaffold-evidence-review" `
  -Route "src\app\project-scaffold-evidence-review" `
  -MainPanel "ProjectScaffoldEvidenceReviewPanel" `
  -CommandLabel "Go to Project Scaffold Evidence Review" `
  -Modules @("project-scaffold-evidence-review-model.ts", "index.ts") `
  -Components @("ProjectScaffoldEvidenceReviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectScaffoldEvidenceReviewStableKey", "buildProjectScaffoldEvidenceReview", "buildProjectScaffoldEvidenceReviews", "buildProjectScaffoldEvidenceReviewBoundary", "buildProjectScaffoldEvidenceReviewModel", "summarizeProjectScaffoldEvidenceReview", "PROJECT_SCAFFOLD_EVIDENCE_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Project scaffold evidence review", "Project scaffold evidence review does not capture or ingest evidence automatically", "Scaffold evidence requires operator review before use", "File-tree evidence", "Template evidence", "Redaction checklist") `
  -PlainEnglish @("Project scaffold evidence review identity", "File-tree evidence", "Template evidence", "Command/runtime evidence", "Redaction checklist", "Next recommended action") `
  -RouteHref "/project-scaffold-evidence-review"

Write-Host "[OK] CodexForge Phase 635 project scaffold evidence review smoke passed."
