param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 753 First Project Scaffold Adapter Implementation Review" `
  -ScriptFile "smoke-codexforge-first-project-scaffold-adapter-implementation-review.ps1" `
  -Domain "src\lib\codexforge\first-project-scaffold-adapter-implementation-review" `
  -Route "src\app\first-project-scaffold-adapter-implementation-review" `
  -MainPanel "FirstProjectScaffoldAdapterImplementationReviewPanel" `
  -CommandLabel "Go to First Project Scaffold Adapter Implementation Review" `
  -Modules @("first-project-scaffold-adapter-implementation-review-model.ts", "index.ts") `
  -Components @("FirstProjectScaffoldAdapterImplementationReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstProjectScaffoldAdapterImplementationReviewStableKey", "buildFirstProjectScaffoldAdapterImplementationReview", "buildFirstProjectScaffoldAdapterImplementationReviewItems", "buildFirstProjectScaffoldAdapterImplementationReviewBoundary", "buildFirstProjectScaffoldAdapterImplementationReviewModel", "summarizeFirstProjectScaffoldAdapterImplementationReview", "FIRST_PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First Project Scaffold Adapter Implementation Review", "First project scaffold adapter implementation review does not create projects", "Project scaffold adapter implementation requires explicit operator approval", "Implementation review", "Project types", "Template policy", "File/command/runtime dependencies", "Evidence/result/recovery", "Validation", "Unresolved blockers", "Original medieval fantasy", "No copied franchise assets") `
  -PlainEnglish @("First Project Scaffold Adapter Implementation Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "no project/server build or launch execution", "What this unlocks next") `
  -RouteHref "/first-project-scaffold-adapter-implementation-review"

Write-Host "[OK] CodexForge Phase 753 first project scaffold adapter implementation review smoke passed."
