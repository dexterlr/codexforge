param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1178 Real Guarded Command-Runner Adapter Boundary" `
  -ScriptFile "smoke-codexforge-real-guarded-command-runner-adapter-boundary.ps1" `
  -Domain "src\lib\codexforge\real-guarded-command-runner-adapter-boundary" `
  -Route "src\app\real-guarded-command-runner-adapter-boundary" `
  -MainPanel "RealGuardedCommandRunnerAdapterBoundaryPanel" `
  -CommandLabel "Go to Real Guarded Command Runner Adapter Boundary" `
  -Modules @("real-guarded-command-runner-adapter-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildRealGuardedCommandRunnerAdapterBoundaryStableKey", "buildRealGuardedCommandRunnerAdapterBoundary", "buildRealGuardedCommandRunnerAdapterBoundaryItems", "buildRealGuardedCommandRunnerAdapterBoundaryBoundary", "buildRealGuardedCommandRunnerAdapterBoundaryModel", "summarizeRealGuardedCommandRunnerAdapterBoundary", "REAL_GUARDED_COMMAND_RUNNER_ADAPTER_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Real guarded command-runner adapter boundary", "Real guarded command-runner adapter boundary does not run commands from UI", "Real guarded command-runner requires explicit operator approval", "Command-runner adapter keeps every command blocked until approval", "Denied real guarded command-runner paths remain blocked", "Real guarded command-runner checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Real guarded command-runner adapter boundary does not run commands from UI", "Real guarded command-runner requires explicit operator approval", "Denied real guarded command-runner paths remain blocked") `
  -RouteHref "/real-guarded-command-runner-adapter-boundary"

Write-Host "[OK] CodexForge Phase 1178 Real Guarded Command-Runner Adapter Boundary smoke passed."
