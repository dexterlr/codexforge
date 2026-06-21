param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1130 Simulated Runtime Execution Boundary" `
  -ScriptFile "smoke-codexforge-simulated-runtime-execution-boundary.ps1" `
  -Domain "src\lib\codexforge\simulated-runtime-execution-boundary" `
  -Route "src\app\simulated-runtime-execution-boundary" `
  -MainPanel "SimulatedRuntimeExecutionBoundaryPanel" `
  -CommandLabel "Go to Simulated Runtime Execution Boundary" `
  -Modules @("simulated-runtime-execution-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedRuntimeExecutionBoundaryStableKey", "buildSimulatedRuntimeExecutionBoundary", "buildSimulatedRuntimeExecutionBoundaryItems", "buildSimulatedRuntimeExecutionBoundaryBoundary", "buildSimulatedRuntimeExecutionBoundaryModel", "summarizeSimulatedRuntimeExecutionBoundary", "SIMULATED_RUNTIME_EXECUTION_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Simulated runtime execution boundary", "Simulated runtime execution boundary does not start runtimes", "Simulated runtime execution requires explicit operator approval", "Simulated runtime execution keeps every runtime blocked", "Denied simulated runtime execution paths remain blocked", "Simulated runtime execution checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated runtime execution boundary does not start runtimes", "Simulated runtime execution requires explicit operator approval", "Denied simulated runtime execution paths remain blocked") `
  -RouteHref "/simulated-runtime-execution-boundary"

Write-Host "[OK] CodexForge Phase 1130 Simulated Runtime Execution Boundary smoke passed."
