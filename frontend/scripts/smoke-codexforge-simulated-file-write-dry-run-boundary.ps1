param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1098 Simulated File Write Dry-Run Boundary" `
  -ScriptFile "smoke-codexforge-simulated-file-write-dry-run-boundary.ps1" `
  -Domain "src\lib\codexforge\simulated-file-write-dry-run-boundary" `
  -Route "src\app\simulated-file-write-dry-run-boundary" `
  -MainPanel "SimulatedFileWriteDryRunBoundaryPanel" `
  -CommandLabel "Go to Simulated File Write Dry-Run Boundary" `
  -Modules @("simulated-file-write-dry-run-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileWriteDryRunBoundaryStableKey", "buildSimulatedFileWriteDryRunBoundary", "buildSimulatedFileWriteDryRunBoundaryItems", "buildSimulatedFileWriteDryRunBoundaryBoundary", "buildSimulatedFileWriteDryRunBoundaryModel", "summarizeSimulatedFileWriteDryRunBoundary", "SIMULATED_FILE_WRITE_DRY_RUN_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Simulated file write dry-run boundary", "Simulated file write dry-run boundary does not write files", "Simulated file write dry-run requires explicit operator approval", "Simulated file write keeps every mutation blocked", "Denied simulated file write paths remain blocked", "Simulated file write checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file write dry-run boundary does not write files", "Simulated file write dry-run requires explicit operator approval", "Denied simulated file write paths remain blocked") `
  -RouteHref "/simulated-file-write-dry-run-boundary"

Write-Host "[OK] CodexForge Phase 1098 Simulated File Write Dry-Run Boundary smoke passed."
