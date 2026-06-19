param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 782 Real Result Store Wiring Plan" `
  -ScriptFile "smoke-codexforge-real-result-store-wiring-plan.ps1" `
  -Domain "src\lib\codexforge\real-result-store-wiring-plan" `
  -Route "src\app\real-result-store-wiring-plan" `
  -MainPanel "RealResultStoreWiringPlanPanel" `
  -CommandLabel "Go to Real Result Store Wiring Plan" `
  -Modules @("real-result-store-wiring-plan-model.ts", "index.ts") `
  -Components @("RealResultStoreWiringPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealResultStoreWiringPlanStableKey", "buildRealResultStoreWiringPlan", "buildRealResultStoreWiringPlanItems", "buildRealResultStoreWiringPlanBoundary", "buildRealResultStoreWiringPlanModel", "summarizeRealResultStoreWiringPlan", "REAL_RESULT_STORE_WIRING_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real Result Store Wiring Plan", "Real result store wiring plan does not store or reuse results", "Result store wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "storage boundary", "acceptance/rejection", "reuse scope", "privacy/safety", "retention", "audit", "evidence linkage", "unresolved blockers") `
  -PlainEnglish @("Real Result Store Wiring Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real result store wiring plan does not store or reuse results") `
  -RouteHref "/real-result-store-wiring-plan"

Write-Host "[OK] CodexForge Phase 782 real result store wiring plan smoke passed."
