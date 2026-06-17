param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 651 First Project Scaffold Trial Review" `
  -ScriptFile "smoke-codexforge-first-project-scaffold-trial-review.ps1" `
  -Domain "src\lib\codexforge\first-project-scaffold-trial-review" `
  -Route "src\app\first-project-scaffold-trial-review" `
  -MainPanel "FirstProjectScaffoldTrialReviewPanel" `
  -CommandLabel "Go to First Project Scaffold Trial Review" `
  -Modules @("first-project-scaffold-trial-review-model.ts", "index.ts") `
  -Components @("FirstProjectScaffoldTrialReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstProjectScaffoldTrialReviewStableKey", "buildFirstProjectScaffoldTrialReview", "buildFirstProjectScaffoldTrialReviews", "buildFirstProjectScaffoldTrialReviewBoundary", "buildFirstProjectScaffoldTrialReviewModel", "summarizeFirstProjectScaffoldTrialReview", "FIRST_PROJECT_SCAFFOLD_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First project scaffold trial review", "First project scaffold trial review does not store or reuse scaffold outputs automatically", "Scaffold trial results require operator approval before reuse", "Acceptance", "Rejection", "Recovery", "Hardening", "Packaging readiness") `
  -PlainEnglish @("First project scaffold trial review identity", "Acceptance", "Rejection", "Recovery", "Hardening", "Packaging readiness", "Next recommended action") `
  -RouteHref "/first-project-scaffold-trial-review"

Write-Host "[OK] CodexForge Phase 651 first project scaffold trial review smoke passed."
