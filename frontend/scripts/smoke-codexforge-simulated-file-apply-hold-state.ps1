param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1111 Simulated File Apply Hold State" `
  -ScriptFile "smoke-codexforge-simulated-file-apply-hold-state.ps1" `
  -Domain "src\lib\codexforge\simulated-file-apply-hold-state" `
  -Route "src\app\simulated-file-apply-hold-state" `
  -MainPanel "SimulatedFileApplyHoldStatePanel" `
  -CommandLabel "Go to Simulated File Apply Hold State" `
  -Modules @("simulated-file-apply-hold-state-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildSimulatedFileApplyHoldStateStableKey", "buildSimulatedFileApplyHoldState", "buildSimulatedFileApplyHoldStateItems", "buildSimulatedFileApplyHoldStateBoundary", "buildSimulatedFileApplyHoldStateModel", "summarizeSimulatedFileApplyHoldState", "SIMULATED_FILE_APPLY_HOLD_STATE_LANGUAGE") `
  -PhaseMarkers @("Simulated file apply hold state", "Simulated file apply hold state does not release file writes", "File apply hold release requires explicit operator approval", "Apply hold keeps every file mutation blocked", "Denied simulated file apply hold paths remain blocked", "Simulated file apply hold checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Simulated file apply hold state does not release file writes", "File apply hold release requires explicit operator approval", "Denied simulated file apply hold paths remain blocked") `
  -RouteHref "/simulated-file-apply-hold-state"

Write-Host "[OK] CodexForge Phase 1111 Simulated File Apply Hold State smoke passed."
