param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1159 Simulated Adapter Execution Hold State" `
  -ScriptFile "smoke-codexforge-simulated-adapter-execution-hold-state.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-execution-hold-state" `
  -Route "src\app\simulated-adapter-execution-hold-state" `
  -MainPanel "SimulatedAdapterExecutionHoldStatePanel" `
  -CommandLabel "Go to Simulated Adapter Execution Hold State" `
  -Modules @("simulated-adapter-execution-hold-state-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterExecutionHoldStateStableKey", "buildSimulatedAdapterExecutionHoldState", "buildSimulatedAdapterExecutionHoldStateItems", "buildSimulatedAdapterExecutionHoldStateBoundary", "buildSimulatedAdapterExecutionHoldStateModel", "summarizeSimulatedAdapterExecutionHoldState", "SIMULATED_ADAPTER_EXECUTION_HOLD_STATE_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter execution hold state", "Simulated adapter execution hold state does not release adapters", "Adapter execution hold release requires explicit operator approval", "Execution hold keeps every adapter blocked", "Denied simulated adapter execution hold paths remain blocked", "Simulated adapter execution hold checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter execution hold state does not release adapters", "Adapter execution hold release requires explicit operator approval", "Denied simulated adapter execution hold paths remain blocked") `
  -RouteHref "/simulated-adapter-execution-hold-state"

Write-Host "[OK] CodexForge Phase 1159 Simulated Adapter Execution Hold State smoke passed."
