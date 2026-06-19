param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 764 Actual Local Runtime Adapter Boundary" `
  -ScriptFile "smoke-codexforge-actual-local-runtime-adapter-boundary.ps1" `
  -Domain "src\lib\codexforge\actual-local-runtime-adapter-boundary" `
  -Route "src\app\actual-local-runtime-adapter-boundary" `
  -MainPanel "ActualLocalRuntimeAdapterBoundaryPanel" `
  -CommandLabel "Go to Actual Local Runtime Adapter Boundary" `
  -Modules @("actual-local-runtime-adapter-boundary-model.ts", "index.ts") `
  -Components @("ActualLocalRuntimeAdapterBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildActualLocalRuntimeAdapterBoundaryStableKey", "buildActualLocalRuntimeAdapterBoundary", "buildActualLocalRuntimeAdapterBoundaryItems", "buildActualLocalRuntimeAdapterBoundaryBoundary", "buildActualLocalRuntimeAdapterBoundaryModel", "summarizeActualLocalRuntimeAdapterBoundary", "ACTUAL_LOCAL_RUNTIME_ADAPTER_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Actual Local Runtime Adapter Boundary", "Actual local runtime adapter boundary does not start local runtimes from UI", "Local runtime execution requires explicit operator approval", "Boundary packet fields", "runtime name", "command preview", "port/network", "process lifecycle", "stop policy", "logs policy", "approval state", "recovery plan", "audit link", "evidence link", "result link", "blocked actions") `
  -PlainEnglish @("Actual Local Runtime Adapter Boundary identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not start local runtimes from UI") `
  -RouteHref "/actual-local-runtime-adapter-boundary"

Write-Host "[OK] CodexForge Phase 764 actual local runtime adapter boundary smoke passed."
