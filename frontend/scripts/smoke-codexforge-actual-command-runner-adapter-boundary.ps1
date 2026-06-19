param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 763 Actual Command Runner Adapter Boundary" `
  -ScriptFile "smoke-codexforge-actual-command-runner-adapter-boundary.ps1" `
  -Domain "src\lib\codexforge\actual-command-runner-adapter-boundary" `
  -Route "src\app\actual-command-runner-adapter-boundary" `
  -MainPanel "ActualCommandRunnerAdapterBoundaryPanel" `
  -CommandLabel "Go to Actual Command Runner Adapter Boundary" `
  -Modules @("actual-command-runner-adapter-boundary-model.ts", "index.ts") `
  -Components @("ActualCommandRunnerAdapterBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildActualCommandRunnerAdapterBoundaryStableKey", "buildActualCommandRunnerAdapterBoundary", "buildActualCommandRunnerAdapterBoundaryItems", "buildActualCommandRunnerAdapterBoundaryBoundary", "buildActualCommandRunnerAdapterBoundaryModel", "summarizeActualCommandRunnerAdapterBoundary", "ACTUAL_COMMAND_RUNNER_ADAPTER_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Actual Command Runner Adapter Boundary", "Actual command runner adapter boundary does not run commands from UI", "Command runner execution requires explicit operator approval", "Boundary packet fields", "request id", "command preview", "working directory", "env/secrets redaction", "timeout", "stdout/stderr policy", "exit-code policy", "approval state", "recovery plan", "audit link", "evidence link", "result link", "blocked actions") `
  -PlainEnglish @("Actual Command Runner Adapter Boundary identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not run commands from UI") `
  -RouteHref "/actual-command-runner-adapter-boundary"

Write-Host "[OK] CodexForge Phase 763 actual command runner adapter boundary smoke passed."
