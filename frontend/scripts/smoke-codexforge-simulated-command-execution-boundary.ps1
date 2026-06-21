param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1114 Simulated Command Execution Boundary" `
  -ScriptFile "smoke-codexforge-simulated-command-execution-boundary.ps1" `
  -Domain "src\lib\codexforge\simulated-command-execution-boundary" `
  -Route "src\app\simulated-command-execution-boundary" `
  -MainPanel "SimulatedCommandExecutionBoundaryPanel" `
  -CommandLabel "Go to Simulated Command Execution Boundary" `
  -Modules @("simulated-command-execution-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedCommandExecutionBoundaryStableKey", "buildSimulatedCommandExecutionBoundary", "buildSimulatedCommandExecutionBoundaryItems", "buildSimulatedCommandExecutionBoundaryBoundary", "buildSimulatedCommandExecutionBoundaryModel", "summarizeSimulatedCommandExecutionBoundary", "SIMULATED_COMMAND_EXECUTION_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Simulated command execution boundary", "Simulated command execution boundary does not run commands", "Simulated command execution requires explicit operator approval", "Simulated command execution keeps every command blocked", "Denied simulated command execution paths remain blocked", "Simulated command execution checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated command execution boundary does not run commands", "Simulated command execution requires explicit operator approval", "Denied simulated command execution paths remain blocked") `
  -RouteHref "/simulated-command-execution-boundary"

Write-Host "[OK] CodexForge Phase 1114 Simulated Command Execution Boundary smoke passed."
