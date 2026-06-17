param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 655 First Command Execution Trial Review" `
  -ScriptFile "smoke-codexforge-first-command-execution-trial-review.ps1" `
  -Domain "src\lib\codexforge\first-command-execution-trial-review" `
  -Route "src\app\first-command-execution-trial-review" `
  -MainPanel "FirstCommandExecutionTrialReviewPanel" `
  -CommandLabel "Go to First Command Execution Trial Review" `
  -Modules @("first-command-execution-trial-review-model.ts", "index.ts") `
  -Components @("FirstCommandExecutionTrialReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstCommandExecutionTrialReviewStableKey", "buildFirstCommandExecutionTrialReview", "buildFirstCommandExecutionTrialReviews", "buildFirstCommandExecutionTrialReviewBoundary", "buildFirstCommandExecutionTrialReviewModel", "summarizeFirstCommandExecutionTrialReview", "FIRST_COMMAND_EXECUTION_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First command execution trial review", "First command execution trial review does not execute commands", "Command outputs require operator review before reuse", "Log redaction", "Result acceptance", "Retry", "Recovery", "Packaging readiness") `
  -PlainEnglish @("First command execution trial review identity", "Log redaction", "Result acceptance", "Retry", "Recovery", "Packaging readiness", "Next recommended action") `
  -RouteHref "/first-command-execution-trial-review"

Write-Host "[OK] CodexForge Phase 655 first command execution trial review smoke passed."
