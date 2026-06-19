param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 789 Real Adapter Validation Wiring Plan" `
  -ScriptFile "smoke-codexforge-real-adapter-validation-wiring-plan.ps1" `
  -Domain "src\lib\codexforge\real-adapter-validation-wiring-plan" `
  -Route "src\app\real-adapter-validation-wiring-plan" `
  -MainPanel "RealAdapterValidationWiringPlanPanel" `
  -CommandLabel "Go to Real Adapter Validation Wiring Plan" `
  -Modules @("real-adapter-validation-wiring-plan-model.ts", "index.ts") `
  -Components @("RealAdapterValidationWiringPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealAdapterValidationWiringPlanStableKey", "buildRealAdapterValidationWiringPlan", "buildRealAdapterValidationWiringPlanItems", "buildRealAdapterValidationWiringPlanBoundary", "buildRealAdapterValidationWiringPlanModel", "summarizeRealAdapterValidationWiringPlan", "REAL_ADAPTER_VALIDATION_WIRING_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real Adapter Validation Wiring Plan", "Real adapter validation wiring plan does not run validation from UI", "Adapter validation wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "smokes", "build", "repo hygiene", "route coverage", "command UI simplification", "checkpoint docs", "server smoke", "evidence/result linkage", "unresolved blockers") `
  -PlainEnglish @("Real Adapter Validation Wiring Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real adapter validation wiring plan does not run validation from UI") `
  -RouteHref "/real-adapter-validation-wiring-plan"

Write-Host "[OK] CodexForge Phase 789 real adapter validation wiring plan smoke passed."
