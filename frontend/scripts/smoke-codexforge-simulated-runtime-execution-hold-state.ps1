param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1143 Simulated Runtime Execution Hold State" `
  -ScriptFile "smoke-codexforge-simulated-runtime-execution-hold-state.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-execution-hold-state" `
  -Route "src\app\simulated-runtime-execution-hold-state" `
  -MainPanel "SimulatedRuntimeExecutionHoldStatePanel" `
  -CommandLabel "Go to Simulated Runtime Execution Hold State" `
  -Modules @("simulated-runtime-execution-hold-state-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimeExecutionHoldStateStableKey", "buildSimulatedRuntimeExecutionHoldState", "buildSimulatedRuntimeExecutionHoldStateItems", "buildSimulatedRuntimeExecutionHoldStateBoundary", "buildSimulatedRuntimeExecutionHoldStateModel", "summarizeSimulatedRuntimeExecutionHoldState", "SIMULATED_RUNTIME_EXECUTION_HOLD_STATE_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime execution hold state", "Simulated runtime execution hold state does not release runtimes", "Runtime execution hold release requires explicit operator approval", "Execution hold keeps every runtime blocked", "Denied simulated runtime execution hold paths remain blocked", "Simulated runtime execution hold checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime execution hold state does not release runtimes", "Runtime execution hold release requires explicit operator approval", "Denied simulated runtime execution hold paths remain blocked") `
  -RouteHref "/simulated-runtime-execution-hold-state"

Write-Host "[OK] CodexForge Phase 1143 Simulated Runtime Execution Hold State smoke passed."
