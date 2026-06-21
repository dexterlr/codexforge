param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1119 Simulated Command Working Directory Review" `
  -ScriptFile "smoke-codexforge-simulated-command-working-directory-review.ps1" `
  -Domain "src\lib\codexforge\simulated-command-working-directory-review" `
  -Route "src\app\simulated-command-working-directory-review" `
  -MainPanel "SimulatedCommandWorkingDirectoryReviewPanel" `
  -CommandLabel "Go to Simulated Command Working Directory Review" `
  -Modules @("simulated-command-working-directory-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandWorkingDirectoryReviewStableKey", "buildSimulatedCommandWorkingDirectoryReview", "buildSimulatedCommandWorkingDirectoryReviewItems", "buildSimulatedCommandWorkingDirectoryReviewBoundary", "buildSimulatedCommandWorkingDirectoryReviewModel", "summarizeSimulatedCommandWorkingDirectoryReview", "SIMULATED_COMMAND_WORKING_DIRECTORY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Simulated command working directory review", "Simulated command working directory review does not browse local files", "Command working directory review requires explicit operator approval", "Working directory reviews show planned paths without crawling", "Denied simulated command working directory paths remain blocked", "Simulated command working directory checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command working directory review does not browse local files", "Command working directory review requires explicit operator approval", "Denied simulated command working directory paths remain blocked") `
  -RouteHref "/simulated-command-working-directory-review"

Write-Host "[OK] CodexForge Phase 1119 Simulated Command Working Directory Review smoke passed."
