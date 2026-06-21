param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1186 Command Execution Hold" `
  -ScriptFile "smoke-codexforge-command-execution-hold.ps1" `
  -Domain "src\lib\codexforge\command-execution-hold" `
  -Route "src\app\command-execution-hold" `
  -MainPanel "CommandExecutionHoldPanel" `
  -CommandLabel "Go to Command Execution Hold" `
  -Modules @("command-execution-hold-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandExecutionHoldStableKey", "buildCommandExecutionHold", "buildCommandExecutionHoldItems", "buildCommandExecutionHoldBoundary", "buildCommandExecutionHoldModel", "summarizeCommandExecutionHold", "COMMAND_EXECUTION_HOLD_LANGUAGE") `
  -PhaseMarkers @("Command execution hold", "Command execution hold does not release commands", "Command execution hold requires explicit operator approval", "Execution hold keeps every future command blocked", "Denied command execution hold paths remain blocked", "Command execution hold checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command execution hold does not release commands", "Command execution hold requires explicit operator approval", "Denied command execution hold paths remain blocked") `
  -RouteHref "/command-execution-hold"

Write-Host "[OK] CodexForge Phase 1186 Command Execution Hold smoke passed."
