param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1062 Build Plan Execution Hold State" `
  -ScriptFile "smoke-codexforge-build-plan-execution-hold-state.ps1" `
  -Domain "src\lib\codexforge\build-plan-execution-hold-state" `
  -Route "src\app\build-plan-execution-hold-state" `
  -MainPanel "BuildPlanExecutionHoldStatePanel" `
  -CommandLabel "Go to Build Plan Execution Hold State" `
  -Modules @("build-plan-execution-hold-state-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuildPlanExecutionHoldStateStableKey", "buildBuildPlanExecutionHoldState", "buildBuildPlanExecutionHoldStateItems", "buildBuildPlanExecutionHoldStateBoundary", "buildBuildPlanExecutionHoldStateModel", "summarizeBuildPlanExecutionHoldState", "BUILD_PLAN_EXECUTION_HOLD_STATE_LANGUAGE") `
  -PhaseMarkers @("Build plan execution hold state", "Build plan execution hold state does not execute builds", "Execution hold release requires explicit operator approval", "Execution hold keeps every model backend and domain action blocked", "Denied build plan execution hold paths remain blocked", "Build plan execution hold checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Build plan execution hold state does not execute builds", "Execution hold release requires explicit operator approval", "Denied build plan execution hold paths remain blocked") `
  -RouteHref "/build-plan-execution-hold-state"

Write-Host "[OK] CodexForge Phase 1062 Build Plan Execution Hold State smoke passed."
