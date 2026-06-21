param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1146 Simulated Adapter Execution Boundary" `
  -ScriptFile "smoke-codexforge-simulated-adapter-execution-boundary.ps1" `
  -Domain "src\lib\codexforge\simulated-adapter-execution-boundary" `
  -Route "src\app\simulated-adapter-execution-boundary" `
  -MainPanel "SimulatedAdapterExecutionBoundaryPanel" `
  -CommandLabel "Go to Simulated Adapter Execution Boundary" `
  -Modules @("simulated-adapter-execution-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedAdapterExecutionBoundaryStableKey", "buildSimulatedAdapterExecutionBoundary", "buildSimulatedAdapterExecutionBoundaryItems", "buildSimulatedAdapterExecutionBoundaryBoundary", "buildSimulatedAdapterExecutionBoundaryModel", "summarizeSimulatedAdapterExecutionBoundary", "SIMULATED_ADAPTER_EXECUTION_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Simulated adapter execution boundary", "Simulated adapter execution boundary does not execute adapters", "Simulated adapter execution requires explicit operator approval", "Simulated adapter execution keeps every adapter blocked", "Denied simulated adapter execution paths remain blocked", "Simulated adapter execution checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated adapter execution boundary does not execute adapters", "Simulated adapter execution requires explicit operator approval", "Denied simulated adapter execution paths remain blocked") `
  -RouteHref "/simulated-adapter-execution-boundary"

Write-Host "[OK] CodexForge Phase 1146 Simulated Adapter Execution Boundary smoke passed."
