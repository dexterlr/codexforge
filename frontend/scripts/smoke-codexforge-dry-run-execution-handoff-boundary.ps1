param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1082 Dry-Run Execution Handoff Boundary" `
  -ScriptFile "smoke-codexforge-dry-run-execution-handoff-boundary.ps1" `
  -Domain "src\lib\codexforge\dry-run-execution-handoff-boundary" `
  -Route "src\app\dry-run-execution-handoff-boundary" `
  -MainPanel "DryRunExecutionHandoffBoundaryPanel" `
  -CommandLabel "Go to Dry-Run Execution Handoff Boundary" `
  -Modules @("dry-run-execution-handoff-boundary-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildDryRunExecutionHandoffBoundaryStableKey", "buildDryRunExecutionHandoffBoundary", "buildDryRunExecutionHandoffBoundaryItems", "buildDryRunExecutionHandoffBoundaryBoundary", "buildDryRunExecutionHandoffBoundaryModel", "summarizeDryRunExecutionHandoffBoundary", "DRY_RUN_EXECUTION_HANDOFF_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Dry-run execution handoff boundary", "Dry-run execution handoff boundary does not execute dry-runs", "Dry-run execution handoff requires explicit operator approval", "Dry-run handoffs keep every execution arm blocked", "Denied dry-run execution handoff paths remain blocked", "Dry-run execution handoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Dry-run execution handoff boundary does not execute dry-runs", "Dry-run execution handoff requires explicit operator approval", "Denied dry-run execution handoff paths remain blocked") `
  -RouteHref "/dry-run-execution-handoff-boundary"

Write-Host "[OK] CodexForge Phase 1082 Dry-Run Execution Handoff Boundary smoke passed."
