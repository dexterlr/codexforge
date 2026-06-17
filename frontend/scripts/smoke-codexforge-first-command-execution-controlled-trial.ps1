param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 654 First Command Execution Controlled Trial" `
  -ScriptFile "smoke-codexforge-first-command-execution-controlled-trial.ps1" `
  -Domain "src\lib\codexforge\first-command-execution-controlled-trial" `
  -Route "src\app\first-command-execution-controlled-trial" `
  -MainPanel "FirstCommandExecutionControlledTrialPanel" `
  -CommandLabel "Go to First Command Execution Controlled Trial" `
  -Modules @("first-command-execution-controlled-trial-model.ts", "index.ts") `
  -Components @("FirstCommandExecutionControlledTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstCommandExecutionControlledTrialStableKey", "buildFirstCommandExecutionControlledTrial", "buildFirstCommandExecutionControlledTrials", "buildFirstCommandExecutionControlledTrialBoundary", "buildFirstCommandExecutionControlledTrialModel", "summarizeFirstCommandExecutionControlledTrial", "FIRST_COMMAND_EXECUTION_CONTROLLED_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First command execution controlled trial", "First command execution controlled trial does not run commands", "Command execution requires explicit operator approval", "Command preview", "Working directory", "Env/secrets", "Timeout", "Stdout/stderr", "Exit code", "Recovery checklist") `
  -PlainEnglish @("First command execution controlled trial identity", "Command preview", "Working directory", "Env/secrets", "Timeout", "Stdout/stderr", "Exit code", "Recovery checklist", "Next recommended action") `
  -RouteHref "/first-command-execution-controlled-trial"

Write-Host "[OK] CodexForge Phase 654 first command execution controlled trial smoke passed."
