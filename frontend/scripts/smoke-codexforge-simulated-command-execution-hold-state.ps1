param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1126 Simulated Command Execution Hold State" `
  -ScriptFile "smoke-codexforge-simulated-command-execution-hold-state.ps1" `
  -Domain "src\lib\codexforge\simulated-command-execution-hold-state" `
  -Route "src\app\simulated-command-execution-hold-state" `
  -MainPanel "SimulatedCommandExecutionHoldStatePanel" `
  -CommandLabel "Go to Simulated Command Execution Hold State" `
  -Modules @("simulated-command-execution-hold-state-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandExecutionHoldStateStableKey", "buildSimulatedCommandExecutionHoldState", "buildSimulatedCommandExecutionHoldStateItems", "buildSimulatedCommandExecutionHoldStateBoundary", "buildSimulatedCommandExecutionHoldStateModel", "summarizeSimulatedCommandExecutionHoldState", "SIMULATED_COMMAND_EXECUTION_HOLD_STATE_LANGUAGE") `
  -PhaseMarkers @("Simulated command execution hold state", "Simulated command execution hold state does not release commands", "Command execution hold release requires explicit operator approval", "Execution hold keeps every command blocked", "Denied simulated command execution hold paths remain blocked", "Simulated command execution hold checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command execution hold state does not release commands", "Command execution hold release requires explicit operator approval", "Denied simulated command execution hold paths remain blocked") `
  -RouteHref "/simulated-command-execution-hold-state"

Write-Host "[OK] CodexForge Phase 1126 Simulated Command Execution Hold State smoke passed."
