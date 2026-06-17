param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 641 Command Execution Controlled Trial Plan" `
  -ScriptFile "smoke-codexforge-command-execution-controlled-trial-plan.ps1" `
  -Domain "src\lib\codexforge\command-execution-controlled-trial-plan" `
  -Route "src\app\command-execution-controlled-trial-plan" `
  -MainPanel "CommandExecutionControlledTrialPlanPanel" `
  -CommandLabel "Go to Command Execution Controlled Trial Plan" `
  -Modules @("command-execution-controlled-trial-plan-model.ts", "index.ts") `
  -Components @("CommandExecutionControlledTrialPlanPanel.tsx", "index.ts") `
  -Exports @("buildCommandExecutionControlledTrialPlanStableKey", "buildCommandExecutionControlledTrialPlan", "buildCommandExecutionControlledTrialPlans", "buildCommandExecutionControlledTrialPlanBoundary", "buildCommandExecutionControlledTrialPlanModel", "summarizeCommandExecutionControlledTrialPlan", "COMMAND_EXECUTION_CONTROLLED_TRIAL_PLAN_LANGUAGE") `
  -PhaseMarkers @("Command execution controlled trial plan", "Command execution controlled trial plan does not run commands", "Command execution controlled trials require explicit operator approval", "Working directory checklist", "Env/secrets checklist", "Timeout checklist", "Log checklist", "Rollback checklist") `
  -PlainEnglish @("Command execution controlled trial plan identity", "Working directory checklist", "Env/secrets checklist", "Timeout checklist", "Log checklist", "Rollback checklist", "Next recommended action") `
  -RouteHref "/command-execution-controlled-trial-plan"

Write-Host "[OK] CodexForge Phase 641 command execution controlled trial plan smoke passed."
