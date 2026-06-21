param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1066 Guarded Execution Queue Boundary" `
  -ScriptFile "smoke-codexforge-guarded-execution-queue-boundary.ps1" `
  -Domain "src\lib\codexforge\guarded-execution-queue-boundary" `
  -Route "src\app\guarded-execution-queue-boundary" `
  -MainPanel "GuardedExecutionQueueBoundaryPanel" `
  -CommandLabel "Go to Guarded Execution Queue Boundary" `
  -Modules @("guarded-execution-queue-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedExecutionQueueBoundaryStableKey", "buildGuardedExecutionQueueBoundary", "buildGuardedExecutionQueueBoundaryItems", "buildGuardedExecutionQueueBoundaryBoundary", "buildGuardedExecutionQueueBoundaryModel", "summarizeGuardedExecutionQueueBoundary", "GUARDED_EXECUTION_QUEUE_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Guarded execution queue boundary", "Guarded execution queue boundary does not create real queue jobs", "Guarded execution queue requires explicit operator approval", "Guarded execution queue keeps every execution arm blocked", "Denied guarded execution queue paths remain blocked", "Guarded execution queue checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded execution queue boundary does not create real queue jobs", "Guarded execution queue requires explicit operator approval", "Denied guarded execution queue paths remain blocked") `
  -RouteHref "/guarded-execution-queue-boundary"

Write-Host "[OK] CodexForge Phase 1066 Guarded Execution Queue Boundary smoke passed."
