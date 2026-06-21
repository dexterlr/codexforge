param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1105 Simulated File Conflict Review" `
  -ScriptFile "smoke-codexforge-simulated-file-conflict-review.ps1" `
  -Domain "src\lib\codexforge\simulated-file-conflict-review" `
  -Route "src\app\simulated-file-conflict-review" `
  -MainPanel "SimulatedFileConflictReviewPanel" `
  -CommandLabel "Go to Simulated File Conflict Review" `
  -Modules @("simulated-file-conflict-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileConflictReviewStableKey", "buildSimulatedFileConflictReview", "buildSimulatedFileConflictReviewItems", "buildSimulatedFileConflictReviewBoundary", "buildSimulatedFileConflictReviewModel", "summarizeSimulatedFileConflictReview", "SIMULATED_FILE_CONFLICT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated file conflict review", "Simulated file conflict review does not resolve conflicts", "File conflict review requires explicit operator approval", "Conflict reviews keep every mutation blocked", "Denied simulated file conflict paths remain blocked", "Simulated file conflict checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file conflict review does not resolve conflicts", "File conflict review requires explicit operator approval", "Denied simulated file conflict paths remain blocked") `
  -RouteHref "/simulated-file-conflict-review"

Write-Host "[OK] CodexForge Phase 1105 Simulated File Conflict Review smoke passed."
