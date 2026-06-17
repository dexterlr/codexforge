param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 642 Command Execution Controlled Trial Review" `
  -ScriptFile "smoke-codexforge-command-execution-controlled-trial-review.ps1" `
  -Domain "src\lib\codexforge\command-execution-controlled-trial-review" `
  -Route "src\app\command-execution-controlled-trial-review" `
  -MainPanel "CommandExecutionControlledTrialReviewPanel" `
  -CommandLabel "Go to Command Execution Controlled Trial Review" `
  -Modules @("command-execution-controlled-trial-review-model.ts", "index.ts") `
  -Components @("CommandExecutionControlledTrialReviewPanel.tsx", "index.ts") `
  -Exports @("buildCommandExecutionControlledTrialReviewStableKey", "buildCommandExecutionControlledTrialReview", "buildCommandExecutionControlledTrialReviews", "buildCommandExecutionControlledTrialReviewBoundary", "buildCommandExecutionControlledTrialReviewModel", "summarizeCommandExecutionControlledTrialReview", "COMMAND_EXECUTION_CONTROLLED_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Command execution controlled trial review", "Command execution controlled trial review does not execute commands", "Command outputs require operator review before reuse", "Stdout/stderr/log redaction", "Exit-code checklist", "Retry/recovery checklist") `
  -PlainEnglish @("Command execution controlled trial review identity", "Stdout/stderr/log redaction", "Exit-code checklist", "Retry/recovery checklist", "Next recommended action") `
  -RouteHref "/command-execution-controlled-trial-review"

Write-Host "[OK] CodexForge Phase 642 command execution controlled trial review smoke passed."
