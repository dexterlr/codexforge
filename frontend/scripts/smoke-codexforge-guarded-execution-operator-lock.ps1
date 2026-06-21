param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1078 Guarded Execution Operator Lock" `
  -ScriptFile "smoke-codexforge-guarded-execution-operator-lock.ps1" `
  -Domain "src\lib\codexforge\guarded-execution-operator-lock" `
  -Route "src\app\guarded-execution-operator-lock" `
  -MainPanel "GuardedExecutionOperatorLockPanel" `
  -CommandLabel "Go to Guarded Execution Operator Lock" `
  -Modules @("guarded-execution-operator-lock-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedExecutionOperatorLockStableKey", "buildGuardedExecutionOperatorLock", "buildGuardedExecutionOperatorLockItems", "buildGuardedExecutionOperatorLockBoundary", "buildGuardedExecutionOperatorLockModel", "summarizeGuardedExecutionOperatorLock", "GUARDED_EXECUTION_OPERATOR_LOCK_LANGUAGE") `
  -PhaseMarkers @("Guarded execution operator lock", "Guarded execution operator lock does not release execution", "Operator lock release requires explicit human approval", "Operator locks keep model backend and domain actions blocked", "Denied guarded execution operator lock paths remain blocked", "Guarded execution operator lock checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded execution operator lock does not release execution", "Operator lock release requires explicit human approval", "Denied guarded execution operator lock paths remain blocked") `
  -RouteHref "/guarded-execution-operator-lock"

Write-Host "[OK] CodexForge Phase 1078 Guarded Execution Operator Lock smoke passed."
