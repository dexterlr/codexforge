param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 790 Real Adapter Operator Trial Plan" `
  -ScriptFile "smoke-codexforge-real-adapter-operator-trial-plan.ps1" `
  -Domain "src\lib\codexforge\real-adapter-operator-trial-plan" `
  -Route "src\app\real-adapter-operator-trial-plan" `
  -MainPanel "RealAdapterOperatorTrialPlanPanel" `
  -CommandLabel "Go to Real Adapter Operator Trial Plan" `
  -Modules @("real-adapter-operator-trial-plan-model.ts", "index.ts") `
  -Components @("RealAdapterOperatorTrialPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealAdapterOperatorTrialPlanStableKey", "buildRealAdapterOperatorTrialPlan", "buildRealAdapterOperatorTrialPlanItems", "buildRealAdapterOperatorTrialPlanBoundary", "buildRealAdapterOperatorTrialPlanModel", "summarizeRealAdapterOperatorTrialPlan", "REAL_ADAPTER_OPERATOR_TRIAL_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real Adapter Operator Trial Plan", "Real adapter operator trial plan does not execute adapters", "Adapter operator trials require explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "operator trial flow", "approval review", "dry-run review", "sandbox review", "observation", "validation", "rollback", "handoff", "unresolved blockers") `
  -PlainEnglish @("Real Adapter Operator Trial Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real adapter operator trial plan does not execute adapters") `
  -RouteHref "/real-adapter-operator-trial-plan"

Write-Host "[OK] CodexForge Phase 790 real adapter operator trial plan smoke passed."
