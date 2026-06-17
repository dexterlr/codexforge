param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 637 Project Scaffold Recovery Review" `
  -ScriptFile "smoke-codexforge-project-scaffold-recovery-review.ps1" `
  -Domain "src\lib\codexforge\project-scaffold-recovery-review" `
  -Route "src\app\project-scaffold-recovery-review" `
  -MainPanel "ProjectScaffoldRecoveryReviewPanel" `
  -CommandLabel "Go to Project Scaffold Recovery Review" `
  -Modules @("project-scaffold-recovery-review-model.ts", "index.ts") `
  -Components @("ProjectScaffoldRecoveryReviewPanel.tsx", "index.ts") `
  -Exports @("buildProjectScaffoldRecoveryReviewStableKey", "buildProjectScaffoldRecoveryReview", "buildProjectScaffoldRecoveryReviews", "buildProjectScaffoldRecoveryReviewBoundary", "buildProjectScaffoldRecoveryReviewModel", "summarizeProjectScaffoldRecoveryReview", "PROJECT_SCAFFOLD_RECOVERY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Project scaffold recovery review", "Project scaffold recovery review does not trigger recovery or retry", "Recovery actions require explicit operator approval", "Rollback checklist", "Partial scaffold cleanup", "Escalation checklist", "Retry checklist") `
  -PlainEnglish @("Project scaffold recovery review identity", "Rollback checklist", "Partial scaffold cleanup", "Escalation checklist", "Retry checklist", "Next recommended action") `
  -RouteHref "/project-scaffold-recovery-review"

Write-Host "[OK] CodexForge Phase 637 project scaffold recovery review smoke passed."
